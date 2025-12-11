import { z } from "zod";

export const eventSchema = z
  .object({
    title: z.string().min(5, { message: "Nama event minimal 5 karakter" }),
    description: z
      .string()
      .min(20, { message: "Deskripsi minimal 20 karakter" }),
    location: z.string().min(3, { message: "Lokasi wajib diisi" }),
    startDate: z.string().refine((date) => new Date(date) > new Date(), {
      message: "Tanggal mulai harus di masa depan",
    }),
    endDate: z.string(),
    ticketType: z.enum(["Free", "Paid"]),
    price: z.coerce.number().min(0),
    availableSeats: z.coerce.number().min(1),
    category: z.string().min(1, { message: "Pilih kategori event" }),
    image: z
      .any()
      .refine((file) => file instanceof File || typeof file === "string", {
        message: "Wajib upload gambar poster event",
      }),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "Tanggal selesai harus setelah tanggal mulai",
    path: ["endDate"],
  });

export type EventFormValues = z.infer<typeof eventSchema>;
