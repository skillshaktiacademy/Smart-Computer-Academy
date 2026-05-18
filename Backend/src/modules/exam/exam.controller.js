import { Exam } from "./exam.model.js";
import { Result } from "./result.model.js";
import { Enrollment } from "../enrollment/enrollment.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

/**
 * Schedule an exam (Teacher/Owner)
 */
export const scheduleExam = asyncHandler(async (req, res) => {
  const { title, courseId, examDate, totalMarks, passingMarks } = req.body;

  const exam = await Exam.create({
    title,
    courseId,
    franchiseId: req.user.franchiseId,
    examDate,
    totalMarks,
    passingMarks,
    createdBy: req.user._id,
  });

  return res.status(201).json(new ApiResponse(201, exam, "Exam scheduled successfully"));
});

/**
 * List exams
 */
export const getExams = asyncHandler(async (req, res) => {
  const { franchiseId, courseId } = req.query;
  const query = {};
  
  if (franchiseId) query.franchiseId = franchiseId;
  else if (req.user.role !== "super_admin") query.franchiseId = req.user.franchiseId;
  
  if (courseId) query.courseId = courseId;

  const exams = await Exam.find(query).populate("courseId", "title");
  return res.status(200).json(new ApiResponse(200, exams, "Exams fetched successfully"));
});

/**
 * Publish results (Admin/Owner)
 */
export const publishResults = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const exam = await Exam.findById(id);

  if (!exam) throw new ApiError(404, "Exam not found");

  exam.status = "completed";
  await exam.save();

  await Result.updateMany(
    { examId: id },
    { publishedAt: new Date() }
  );

  return res.status(200).json(new ApiResponse(200, {}, "Results published successfully"));
});

/**
 * Submit results for multiple students (Teacher)
 */
export const submitResults = asyncHandler(async (req, res) => {
  const { examId, marksData } = req.body; // marksData = [{studentId, marksObtained}]

  const exam = await Exam.findById(examId);
  if (!exam) throw new ApiError(404, "Exam not found");

  const results = await Promise.all(
    marksData.map(async (item) => {
      const enrollment = await Enrollment.findOne({
        studentId: item.studentId,
        courseId: exam.courseId,
        status: "active",
      });

      if (!enrollment) return null;

      return await Result.findOneAndUpdate(
        { studentId: item.studentId, examId },
        {
          studentId: item.studentId,
          examId,
          enrollmentId: enrollment._id,
          franchiseId: exam.franchiseId,
          marksObtained: item.marksObtained,
        },
        { upsert: true, new: true }
      );
    })
  );

  return res.status(200).json(new ApiResponse(200, results.filter(r => r !== null), "Results submitted successfully"));
});

/**
 * Get results for a student
 */
export const getStudentResults = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const results = await Result.find({ studentId: id })
    .populate("examId")
    .sort({ createdAt: -1 });
    
  return res.status(200).json(new ApiResponse(200, results, "Student results fetched"));
});

/**
 * Get all results for an exam
 */
export const getExamResults = asyncHandler(async (req, res) => {
  const { examId } = req.params;
  const results = await Result.find({ examId })
    .populate("studentId", "name enrollmentNo")
    .sort({ marksObtained: -1 });
    
  return res.status(200).json(new ApiResponse(200, results, "Exam results fetched"));
});
