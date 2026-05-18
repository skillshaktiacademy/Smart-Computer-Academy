import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),
  duration: z.string().min(1, "Duration is required"),
  fee: z.string().or(z.number()).transform(v => typeof v === 'string' ? parseFloat(v) : v),
  category: z.enum(["DCA", "ADCA", "PGDCA", "Tally", "Other"]),
  syllabus: z.string().optional(), // Expecting JSON string from multipart/form-data
});
