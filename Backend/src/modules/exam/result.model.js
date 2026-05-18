import mongoose, { Schema } from "mongoose";

const resultSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    examId: {
      type: Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    enrollmentId: {
      type: Schema.Types.ObjectId,
      ref: "Enrollment",
      required: true,
    },
    franchiseId: {
      type: Schema.Types.ObjectId,
      ref: "Franchise",
      required: true,
    },
    marksObtained: {
      type: Number,
      required: true,
    },
    grade: {
      type: String,
    },
    remarks: String,
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * Virtual for isPassed
 */
resultSchema.virtual("isPassed").get(function () {
  if (!this.examId || typeof this.examId.passingMarks === 'undefined') return false;
  return this.marksObtained >= this.examId.passingMarks;
});

/**
 * Pre-save hook to calculate grade
 */
resultSchema.pre("save", async function (next) {
  if (this.isModified("marksObtained")) {
    const exam = await mongoose.model("Exam").findById(this.examId);
    if (!exam) return next();

    const percentage = (this.marksObtained / exam.totalMarks) * 100;
    
    if (this.marksObtained < exam.passingMarks) {
      this.grade = "F";
    } else if (percentage >= 90) {
      this.grade = "A+";
    } else if (percentage >= 80) {
      this.grade = "A";
    } else if (percentage >= 70) {
      this.grade = "B";
    } else if (percentage >= 60) {
      this.grade = "C";
    } else {
      this.grade = "D";
    }
  }
  next();
});

export const Result = mongoose.model("Result", resultSchema);
