import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: "Password is required!!" })
  .max(20, { message: "Atleast 20 char is required!" });

export const loginValidSchemas = z.object({
  email: z.string().email({ message: "Email is required!!" }).min(1).max(255),
  password: passwordSchema,
});

export const registerValidSchemas = loginValidSchemas
  .extend({
    userName: z.string().min(1, { message: "UserName is required!!" }).max(45),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!!",
    path: ["confirmPassword"],
  });

export const forgotPasswordShema = z.object({
  email: z.string().email({ message: "Email is required!!" }).min(1).max(255),
});
