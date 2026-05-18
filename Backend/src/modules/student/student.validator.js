import { z } from "zod";

export const addStudentSchema = z.object({
  name: z.string().min(2, "Name is required"),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  dob: z.string().optional(),
  gender: z.enum(["male", "female", "other"]),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional(),
  aadhar: z.string().regex(/^\d{12}$/, "Aadhar must be 12 digits").optional().or(z.literal("")),
});
