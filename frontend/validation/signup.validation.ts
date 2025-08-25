import { z } from "zod";

const strongPasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

const errorMessages = {
  fullName: {
    required: "Full Name is required",
    min: "Full Name must be at least 2 characters long",
  },
  email: {
    required: "Email is required",
    invalid: "Please enter a valid email address",
  },
  password: {
    required: "Password is required",
    regex:
      "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character",
  },
};

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: errorMessages.fullName.min })
    .nonempty({ message: errorMessages.fullName.required }),

  email: z
    .string()
    .email({ message: errorMessages.email.invalid })
    .nonempty({ message: errorMessages.email.required }),

  password: z
    .string()
    .nonempty({ message: errorMessages.password.required })
    .regex(strongPasswordRegex, { message: errorMessages.password.regex }),
  role: z.enum(["DEVELOPER", "EMPLOYER"]),
});

export type SignupFormType = z.infer<typeof signupSchema>;
