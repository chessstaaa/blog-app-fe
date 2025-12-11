import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, { message: "Nama minimal 2 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }),
});

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Password lama wajib diisi" }),
    newPassword: z
      .string()
      .min(8, { message: "Password baru minimal 8 karakter" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Konfirmasi password wajib diisi" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password baru tidak cocok",
    path: ["confirmPassword"],
  });

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type PasswordFormValues = z.infer<typeof passwordSchema>;
