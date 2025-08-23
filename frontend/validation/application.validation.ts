// lib/validations/application.ts
import { z } from "zod";

export const applicationFormSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?\d{7,15}$/.test(val),
      "Invalid phone number"
    ),
  location: z.string().optional(),
  linkedIn: z.string().url("Invalid URL").optional(),
  portfolio: z.string().url("Invalid URL").optional(),
  coverLetter: z.string().optional(),
  salaryExpectation: z.string().optional(),
  noticePeriod: z.string().optional(),
  source: z.string().optional()
  // noticePeriod: z.enum([
  //   "immediately",
  //   "1week",
  //   "2weeks",
  //   "1month",
  //   "2months",
  //   "3months",
  // ]).optional(),
  // source: z.enum(["linkedin", "jobboard", "companywebsite", "referral", "other"]).optional(),
});

// TypeScript type for form data
export type ApplicationFormValues= z.infer<typeof applicationFormSchema>;


// Define the application form schema with Zod


