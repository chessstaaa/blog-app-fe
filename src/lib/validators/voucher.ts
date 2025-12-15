import { z } from "zod";

export const voucherSchema = z.object({
  code: z
    .string()
    .min(3, { message: "Kode minimal 3 karakter" })
    .regex(/^[A-Z0-9]+$/, { message: "Hanya huruf besar dan angka" }),
  eventId: z.string().min(1, { message: "Pilih event untuk voucher ini" }),
  amount: z.coerce.number().min(1, { message: "Nilai potongan wajib diisi" }),
  type: z.enum(["FIXED", "PERCENTAGE"]),
  usageLimit: z.coerce.number().min(1, { message: "Minimal 1 penggunaan" }),
  validUntil: z.string().refine((date) => new Date(date) > new Date(), {
    message: "Tanggal kedaluwarsa harus di masa depan",
  }),
});

export type VoucherFormValues = z.infer<typeof voucherSchema>;
