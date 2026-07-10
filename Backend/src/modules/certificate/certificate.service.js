import puppeteer from "puppeteer";
import QRCode from "qrcode";
import { Certificate } from "./certificate.model.js";
import { Enrollment } from "../enrollment/enrollment.model.js";
import { Result } from "../exam/result.model.js";
import { Student } from "../student/student.model.js";
import { assertCanAccessStudent } from "../../shared/utils/access.utils.js";
import { ApiError } from "../../shared/utils/api.utils.js";
import { uploadBufferToCloudinary } from "../../shared/config/cloudinary.config.js";
import { generatePrefixedId } from "../../shared/utils/generator.utils.js";

const ACADEMY_NAME = "Smart Computer Academy";

/**
 * Escapes HTML-significant characters. Student name / course title are
 * franchise/admin-entered free text rendered into an HTML document that a
 * real headless-Chromium instance (Puppeteer) parses and executes — without
 * escaping, a crafted name (e.g. containing an <img> tag pointing at an
 * internal URL) could trigger server-side requests from that browser
 * process (SSRF) or otherwise break out of the intended markup.
 */
const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));

const certificateHtml = ({ studentName, courseTitle, duration, grade, certificateNo, qrDataUrl }) => `
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
      <div class="header">${ACADEMY_NAME}</div>
      <div class="sub-header">CERTIFICATE OF COMPLETION</div>
      <p>This is to certify that</p>
      <div class="student-name">${escapeHtml(studentName)}</div>
      <p class="course-info">has successfully completed the <b>${escapeHtml(courseTitle)}</b></p>
      <p>Duration: ${escapeHtml(duration)} | Grade: ${escapeHtml(grade)}</p>

      <div class="footer">
        <div class="qr-container">
          <img src="${qrDataUrl}" class="qr-code" />
          <div style="font-size: 10px;">Verify authenticity</div>
        </div>
        <div class="signature">Director Signature</div>
      </div>
      <div class="cert-no">Certificate No: ${certificateNo} | Date: ${new Date().toLocaleDateString()}</div>
    </div>
  </body>
  </html>
`;

// Exported for direct unit testing of the HTML-escaping/QR-encoding logic
// without needing a live database (see scratchpad verification script).
export { escapeHtml, certificateHtml };

export class CertificateService {
  /**
   * Generate and issue a certificate for a completed, passed enrollment.
   * The certificate number is minted up-front (atomic Counter) so the QR
   * code can encode the real, final verification URL before the document
   * is ever persisted — fixes the earlier bug where the QR pointed at
   * enrollmentNo while verification looked up by certificateNo.
   */
  static async generateCertificate(enrollmentId) {
    const enrollment = await Enrollment.findById(enrollmentId)
      .populate("studentId")
      .populate("courseId")
      .populate("franchiseId");

    if (!enrollment) throw new ApiError(404, "Enrollment not found");

    if (enrollment.status !== "completed") {
      throw new ApiError(400, "Course must be completed before issuing certificate");
    }

    const result = await Result.findOne({
      studentId: enrollment.studentId._id,
      enrollmentId,
    }).populate("examId");

    if (!result || !result.isPassed) {
      throw new ApiError(400, "Student must pass the exam before issuing certificate");
    }

    const year = new Date().getFullYear();
    const sequence = await generatePrefixedId(`certificate-${year}`);
    const certificateNo = `SSA/CERT/${year}/${sequence}`;

    const verifyUrl = `${process.env.CLIENT_URL}/verify-certificate/${certificateNo}`;
    const qrDataUrl = await QRCode.toDataURL(verifyUrl);

    const htmlContent = certificateHtml({
      studentName: enrollment.studentId.name,
      courseTitle: enrollment.courseId.title,
      duration: enrollment.courseId.duration,
      grade: result.grade,
      certificateNo,
      qrDataUrl,
    });

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    let uploaded;
    try {
      const page = await browser.newPage();
      await page.setContent(htmlContent);
      const pdfBuffer = await page.pdf({ format: "A4", landscape: true, printBackground: true });
      uploaded = await uploadBufferToCloudinary(pdfBuffer, { resourceType: "raw", folder: "smart_computer_academy/certificates" });
    } finally {
      await browser.close();
    }

    if (!uploaded) throw new ApiError(500, "Failed to upload certificate");

    return Certificate.create({
      studentId: enrollment.studentId._id,
      enrollmentId,
      courseId: enrollment.courseId._id,
      franchiseId: enrollment.franchiseId._id,
      certificateNo,
      qrCode: qrDataUrl,
      file: { url: uploaded.url, public_id: uploaded.public_id },
    });
  }

  /**
   * Public verification — single source of truth for certificate
   * authenticity checks (the frontend's VerifyCertificate.jsx page and any
   * QR code both resolve here). Any duplicate handler elsewhere should be
   * removed in favor of this one.
   */
  static async verifyCertificate(certificateNo) {
    const certificate = await Certificate.findOne({ certificateNo, isRevoked: false })
      .populate("studentId", "name enrollmentNo")
      .populate("courseId", "title")
      .populate("franchiseId", "name");

    if (!certificate) throw new ApiError(404, "Invalid or revoked certificate");

    return {
      studentName: certificate.studentId.name,
      course: certificate.courseId.title,
      issueDate: certificate.issueDate,
      franchiseName: certificate.franchiseId.name,
      certificateNo: certificate.certificateNo,
    };
  }

  static async getStudentCertificates(studentId, requestingUser) {
    const student = await Student.findById(studentId);
    assertCanAccessStudent(requestingUser, student);
    return Certificate.find({ studentId }).populate("courseId");
  }

  /** Self-service: certificates for the logged-in student's own profile. */
  static async getMyCertificates(userId) {
    const student = await Student.findOne({ userId });
    if (!student) return [];
    return Certificate.find({ studentId: student._id }).populate("courseId");
  }

  static async downloadCertificate(id, requestingUser) {
    const certificate = await Certificate.findById(id);
    if (!certificate) throw new ApiError(404, "Certificate not found");

    const student = await Student.findById(certificate.studentId);
    assertCanAccessStudent(requestingUser, student);

    return { downloadUrl: certificate.file.url };
  }
}
