import { Certificate } from "./certificate.model.js";
import { Enrollment } from "../enrollment/enrollment.model.js";
import { Result } from "../exam/result.model.js";
import { Student } from "../student/student.model.js";
import { Franchise } from "../franchise/franchise.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../config/cloudinary.js";
import puppeteer from "puppeteer";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";

/**
 * Generate and Issue a Certificate
 */
export const generateCertificate = asyncHandler(async (req, res) => {
  const { enrollmentId } = req.params;

  const enrollment = await Enrollment.findById(enrollmentId)
    .populate("studentId")
    .populate("courseId")
    .populate("franchiseId");

  if (!enrollment) throw new ApiError(404, "Enrollment not found");

  // 1. Check if course is completed and exam passed
  if (enrollment.status !== "completed") {
    throw new ApiError(400, "Course must be completed before issuing certificate");
  }

  const result = await Result.findOne({ 
    studentId: enrollment.studentId._id, 
    enrollmentId 
  }).populate("examId");

  if (!result || !result.isPassed) {
    throw new ApiError(400, "Student must pass the exam before issuing certificate");
  }

  // 2. Generate QR Code
  const certificateNoPlaceholder = `SSA/CERT/${new Date().getFullYear()}/TEMP`; // We'll update after doc save or use a pre-calculated one
  // Actually let's pre-calculate or just use a verification link
  const verifyUrl = `${process.env.CLIENT_URL}/verify-certificate/${enrollment.studentId.enrollmentNo}`; // Or use cert number
  const qrDataUrl = await QRCode.toDataURL(verifyUrl);

  // 3. Generate HTML Content
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Georgia', serif; margin: 0; padding: 0; }
        .certificate {
          width: 800px; height: 600px; padding: 50px;
          border: 20px solid #1a3a5a; background: #fff;
          position: relative; text-align: center;
        }
        .header { color: #1a3a5a; font-size: 40px; font-weight: bold; margin-bottom: 20px; }
        .sub-header { font-size: 20px; color: #666; margin-bottom: 40px; }
        .student-name { font-size: 50px; font-family: 'Great Vibes', cursive; color: #4a90e2; margin: 30px 0; }
        .course-info { font-size: 24px; color: #333; }
        .footer { position: absolute; bottom: 50px; width: 100%; display: flex; justify-content: space-around; align-items: flex-end; }
        .qr-code { width: 100px; }
        .signature { border-top: 2px solid #333; width: 200px; padding-top: 5px; font-weight: bold; }
        .cert-no { font-size: 12px; color: #888; position: absolute; top: 30px; right: 30px; }
      </style>
    </head>
    <body>
      <div class="certificate">
        <div class="header">Skill Shakti Academy</div>
        <div class="sub-header">CERTIFICATE OF COMPLETION</div>
        <p>This is to certify that</p>
        <div class="student-name">${enrollment.studentId.name}</div>
        <p class="course-info">has successfully completed the <b>${enrollment.courseId.title}</b></p>
        <p>Duration: ${enrollment.courseId.duration} | Grade: ${result.grade}</p>
        
        <div class="footer">
          <div class="qr-container">
            <img src="${qrDataUrl}" class="qr-code" />
            <div style="font-size: 10px;">Verify authenticity</div>
          </div>
          <div class="signature">Director Signature</div>
        </div>
        <div class="cert-no">Date: ${new Date().toLocaleDateString()}</div>
      </div>
    </body>
    </html>
  `;

  // 4. Generate PDF using Puppeteer
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const pdfPath = path.join("public/temp", `cert-${enrollmentId}.pdf`);
  await page.pdf({ path: pdfPath, format: "A4", landscape: true, printBackground: true });
  await browser.close();

  // 5. Upload to Cloudinary
  const uploaded = await uploadOnCloudinary(pdfPath);
  if (!uploaded) throw new ApiError(500, "Failed to upload certificate");

  // 6. Save to DB
  const certificate = await Certificate.create({
    studentId: enrollment.studentId._id,
    enrollmentId,
    courseId: enrollment.courseId._id,
    franchiseId: enrollment.franchiseId._id,
    qrCode: qrDataUrl,
    file: { url: uploaded.url, public_id: uploaded.public_id },
  });

  return res.status(201).json(new ApiResponse(201, certificate, "Certificate generated successfully"));
});

/**
 * Public Verification
 */
export const verifyCertificate = asyncHandler(async (req, res) => {
  const { certificateNo } = req.params;
  const certificate = await Certificate.findOne({ certificateNo, isRevoked: false })
    .populate("studentId", "name enrollmentNo")
    .populate("courseId", "title")
    .populate("franchiseId", "name");

  if (!certificate) {
    throw new ApiError(404, "Invalid or revoked certificate");
  }

  const verificationData = {
    studentName: certificate.studentId.name,
    course: certificate.courseId.title,
    issueDate: certificate.issueDate,
    franchiseName: certificate.franchiseId.name,
    certificateNo: certificate.certificateNo,
  };

  return res.status(200).json(new ApiResponse(200, verificationData, "Certificate verified"));
});

/**
 * Get student certificates
 */
export const getStudentCertificates = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const certificates = await Certificate.find({ studentId }).populate("courseId");
  return res.status(200).json(new ApiResponse(200, certificates, "Certificates fetched"));
});

/**
 * Download certificate
 */
export const downloadCertificate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const certificate = await Certificate.findById(id);
  if (!certificate) throw new ApiError(404, "Certificate not found");
  
  return res.status(200).json(new ApiResponse(200, { downloadUrl: certificate.file.url }, "Download link fetched"));
});
