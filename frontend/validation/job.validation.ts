// lib/validations/job.ts
import { z } from "zod";

export const jobFormSchema = z.object({
  id: z.string().uuid("Invalid job ID").optional(),
  title: z.string().min(1, "Title is required").max(100, "Title too long").optional(),
  type: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters").optional(),
  requirements: z.array(z.string()).optional(),
  responsibilities: z.array(z.string()).optional(),
  location: z.string().optional(),
  aboutCompany: z.string().min(10, "Company description must be at least 10 characters").optional(),
  logo: z.string().url("Invalid URL").optional().or(z.literal("")),
  salary: z.string().optional(),
  category: z.string().optional(),
  featured: z.boolean().default(false).optional(),
  skills: z.array(z.string()).optional(),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;
