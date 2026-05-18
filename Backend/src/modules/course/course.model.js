import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["DCA", "ADCA", "PGDCA", "Tally", "Other"],
      required: true,
    },
    syllabus: [
      {
        moduleTitle: String,
        topics: [String],
      },
    ],
    thumbnail: {
      url: String,
      public_id: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook to generate slug from title
 */
courseSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  }
  next();
});

courseSchema.plugin(mongooseAggregatePaginate);

export const Course = mongoose.model("Course", courseSchema);
