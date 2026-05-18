import { Student } from "./student.model.js";
import { Certificate } from "../certificate/certificate.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../config/cloudinary.js";

/**
 * List students with pagination
 */
export const getAllStudents = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  const aggregate = Student.aggregate([
    {
      $match: {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { enrollmentNo: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ],
      },
    },
  ]);

  // Role based filtering
  if (req.user.role !== "super_admin") {
    aggregate.match({ franchiseId: req.user.franchiseId });
  }

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    populate: "franchiseId",
  };

  const students = await Student.aggregatePaginate(aggregate, options);

  return res.status(200).json(new ApiResponse(200, students, "Students fetched successfully"));
});

/**
 * Add a new student (Franchise Owner/Teacher)
 */
export const addStudent = asyncHandler(async (req, res) => {
  const { name, fatherName, motherName, dob, gender, phone, email, address, aadhar } = req.body;

  let photo = null;
  if (req.file) {
    const uploaded = await uploadOnCloudinary(req.file.path);
    if (uploaded) {
      photo = { url: uploaded.url, public_id: uploaded.public_id };
    }
  }

  // Masking Aadhar last 4 digits (as requested)
  let maskedAadhar = aadhar;
  if (aadhar && aadhar.length >= 4) {
    maskedAadhar = "**** **** " + aadhar.slice(-4);
  }

  const student = await Student.create({
    name,
    fatherName,
    motherName,
    dob,
    gender,
    phone,
    email,
    address,
    photo,
    aadhar: maskedAadhar,
    franchiseId: req.user.franchiseId,
    addedBy: req.user._id,
  });

  return res.status(201).json(new ApiResponse(201, student, "Student added successfully"));
});

/**
 * Get student details by enrollment number
 */
export const getStudentByEnrollmentNo = asyncHandler(async (req, res) => {
  const { enrollmentNo } = req.params;
  const student = await Student.findOne({ enrollmentNo }).populate("franchiseId");

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  return res.status(200).json(new ApiResponse(200, student, "Student details fetched"));
});

/**
 * Update student info
 */
export const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, fatherName, motherName, dob, gender, phone, email, address, isActive } = req.body;

  const student = await Student.findById(id);
  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  // Permission check
  if (req.user.role !== "super_admin" && student.franchiseId.toString() !== req.user.franchiseId.toString()) {
    throw new ApiError(403, "Unauthorized to update this student");
  }

  if (name) student.name = name;
  if (fatherName) student.fatherName = fatherName;
  if (motherName) student.motherName = motherName;
  if (dob) student.dob = dob;
  if (gender) student.gender = gender;
  if (phone) student.phone = phone;
  if (email) student.email = email;
  if (address) student.address = address;
  if (typeof isActive !== 'undefined') student.isActive = isActive;

  if (req.file) {
    const uploaded = await uploadOnCloudinary(req.file.path);
    if (uploaded) {
      student.photo = { url: uploaded.url, public_id: uploaded.public_id };
    }
  }

  await student.save();

  return res.status(200).json(new ApiResponse(200, student, "Student updated successfully"));
});

/**
 * View/Generate student certificate
 */
export const getStudentCertificate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const certificate = await Certificate.findOne({ studentId: id }).populate("courseId");
  
  if (!certificate) {
    throw new ApiError(404, "Certificate not found for this student");
  }

  return res.status(200).json(new ApiResponse(200, certificate, "Certificate fetched"));
});
