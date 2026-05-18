import { z } from "zod";

export const createFranchiseSchema = z.object({
  name: z.string().min(3, "Franchise name must be at least 3 characters"),
  ownerName: z.string().min(2, "Owner name is required"),
  ownerEmail: z.string().email("Invalid owner email"),
  ownerPhone: z.string().regex(/^\d{10}$/, "Owner phone must be 10 digits"),
  ownerPassword: z.string().min(8, "Password must be at least 8 characters"),
  address: z.object({
    street: z.string().optional(),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  }),
  phone: z.string().regex(/^\d{10}$/, "Franchise phone must be 10 digits"),
  email: z.string().email("Invalid franchise email"),
  affiliationCertificateNo: z.string().optional(),
  isHeadBranch: z.boolean().optional(),
});

export const updateFranchiseSchema = z.object({
  name: z.string().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    pincode: z.string().optional(),
  }).optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  affiliationCertificateNo: z.string().optional(),
});
