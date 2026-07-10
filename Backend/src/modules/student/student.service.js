import { nanoid } from "nanoid";
import { Student } from "./student.model.js";
import { Certificate } from "../certificate/certificate.model.js";
import { User } from "../user/user.model.js";
import { ApiError } from "../../shared/utils/api.utils.js";
import { uploadOnCloudinary } from "../../shared/config/cloudinary.config.js";
import { ROLES } from "../../shared/constants/roles.js";
import { NotificationService } from "../../shared/services/notification.service.js";
import logger from "../../shared/utils/logger.js";
import { assertCanAccessStudent } from "../../shared/utils/access.utils.js";

/** Random 10-character temp password for newly-provisioned student logins. */
const generateTempPassword = () => nanoid(10);

export class StudentService {
  static async getAllStudents({ page = 1, limit = 10, search = "" }, requestingUser) {
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

    if (requestingUser.role !== ROLES.SUPER_ADMIN) {
      aggregate.match({ franchiseId: requestingUser.franchiseId });
    }

    return Student.aggregatePaginate(aggregate, {
      page: parseInt(page),
      limit: parseInt(limit),
      populate: "franchiseId",
    });
  }

  /**
   * Add a new student (franchise admission flow). Also provisions a linked
   * student portal login (User doc + Student.userId) since the franchise
   * has already verified the student's identity in person — credentials
   * are emailed/texted to the student so they can self-serve their
   * attendance/results/materials/certificates/fees ("my-X" endpoints).
   */
  static async addStudent(data, requestingUser, file) {
    const { name, fatherName, motherName, dob, gender, phone, email, address, aadhar } = data;

    let photo = null;
    if (file) {
      const uploaded = await uploadOnCloudinary(file.path);
      if (uploaded) photo = { url: uploaded.url, public_id: uploaded.public_id };
    }

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
      franchiseId: requestingUser.franchiseId,
      addedBy: requestingUser._id,
    });

    if (email || phone) {
      try {
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (!existingUser) {
          const tempPassword = generateTempPassword();
          const user = await User.create({
            name,
            email: email || `${student.enrollmentNo.toLowerCase()}@smartcomputeracademy.local`,
            phone,
            password: tempPassword,
            role: ROLES.STUDENT,
            franchiseId: requestingUser.franchiseId,
            isEmailVerified: true, // identity already verified in person during admission
          });

          student.userId = user._id;
          await student.save();

          NotificationService.notifyStudentCredentials(student, email || phone, tempPassword).catch((err) =>
            logger.error(`Student-credentials notification failed: ${err.message}`)
          );
        }
      } catch (error) {
        // Login provisioning is best-effort — the academic profile above is
        // already saved; log and continue rather than failing admission.
        logger.error(`Student login provisioning failed for ${student.enrollmentNo}: ${error.message}`);
      }
    }

    return student;
  }

  /** Franchise/teacher's own center's students (also serves the frontend's /students/my-students call). */
  static async getMyCenterStudents(requestingUser) {
    return Student.find({ franchiseId: requestingUser.franchiseId }).sort({ createdAt: -1 });
  }

  /** Resolves the Student profile linked to the logged-in student's account, if any. */
  static async getMyProfile(userId) {
    return Student.findOne({ userId });
  }

  static async getStudentByEnrollmentNo(enrollmentNo, requestingUser) {
    const student = await Student.findOne({ enrollmentNo }).populate("franchiseId");
    assertCanAccessStudent(requestingUser, student);
    return student;
  }

  static async updateStudent(id, data, requestingUser, file) {
    const student = await Student.findById(id);
    if (!student) throw new ApiError(404, "Student not found");

    if (
      requestingUser.role !== ROLES.SUPER_ADMIN &&
      student.franchiseId.toString() !== requestingUser.franchiseId.toString()
    ) {
      throw new ApiError(403, "Unauthorized to update this student");
    }

    const { name, fatherName, motherName, dob, gender, phone, email, address, isActive } = data;
    if (name) student.name = name;
    if (fatherName) student.fatherName = fatherName;
    if (motherName) student.motherName = motherName;
    if (dob) student.dob = dob;
    if (gender) student.gender = gender;
    if (phone) student.phone = phone;
    if (email) student.email = email;
    if (address) student.address = address;
    if (typeof isActive !== "undefined") student.isActive = isActive;

    if (file) {
      const uploaded = await uploadOnCloudinary(file.path);
      if (uploaded) student.photo = { url: uploaded.url, public_id: uploaded.public_id };
    }

    await student.save();
    return student;
  }

  static async getStudentCertificate(studentId, requestingUser) {
    const student = await Student.findById(studentId);
    assertCanAccessStudent(requestingUser, student);

    const certificate = await Certificate.findOne({ studentId }).populate("courseId");
    if (!certificate) throw new ApiError(404, "Certificate not found for this student");
    return certificate;
  }
}
