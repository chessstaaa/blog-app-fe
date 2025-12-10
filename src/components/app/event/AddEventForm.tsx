"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, EventFormValues } from "@/lib/validators/event";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: EventFormValues) => void;
  initialData?: EventFormValues | null; // Data untuk Edit
}

export function EventForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: EventFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      ticketType: "Paid",
      price: 0,
      availableSeats: 50,
      title: "",
      description: "",
      location: "",
      startDate: "",
      endDate: "",
      category: "",
      image: undefined,
    },
  });

  // Efek untuk mengisi form saat mode Edit (initialData berubah)
  useEffect(() => {
    if (initialData) {
      // Mode Edit: Isi form dengan data lama
      reset({
        ...initialData,
        // Pastikan format tanggal cocok dengan input datetime-local (YYYY-MM-DDTHH:mm)
        startDate: new Date(initialData.startDate).toISOString().slice(0, 16),
        endDate: new Date(initialData.endDate).toISOString().slice(0, 16),
      });
      // Set preview gambar jika string URL
      if (typeof initialData.image === "string") {
        setImagePreview(initialData.image);
      }
    } else {
      // Mode Create: Kosongkan form
      reset({
        ticketType: "Paid",
        price: 0,
        availableSeats: 50,
        title: "",
        description: "",
        location: "",
        startDate: "",
        endDate: "",
        category: "",
        image: undefined,
      });
      setImagePreview(null);
    }
  }, [initialData, reset, open]);

  const ticketType = watch("ticketType");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file); // Set value ke React Hook Form
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl); // Set preview lokal
    }
  };

  const submitHandler = (data: EventFormValues) => {
    // Di real app, disini kita upload gambar ke storage (AWS S3/Cloudinary)
    // Untuk mock, kita biarkan object File atau string URL lewat
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-in fade-in-0 fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-[50%] left-[50%] z-50 grid max-h-[90vh] w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 overflow-y-auto rounded-xl border border-blue-100 bg-white p-6 shadow-lg duration-200 sm:rounded-2xl">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <Dialog.Title className="text-xl leading-none font-bold tracking-tight text-blue-900">
              {initialData ? "Edit Event" : "Buat Event Baru"}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500">
              {initialData
                ? "Perbarui informasi event Anda."
                : "Isi detail lengkap event Anda."}
            </Dialog.Description>
          </div>

          <form
            onSubmit={handleSubmit(submitHandler)}
            className="grid gap-4 py-4"
          >
            {/* Image Upload Area */}
            <div className="grid gap-2">
              <Label>Poster Event</Label>
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-blue-200 bg-blue-50",
                    errors.image && "border-red-500 bg-red-50",
                  )}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-blue-300" />
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer file:mr-4 file:cursor-pointer file:border-0 file:bg-transparent file:font-semibold file:text-blue-600 hover:file:text-blue-700"
                  />
                  <p className="mt-2 text-xs text-gray-400">
                    Format: JPG, PNG. Max 2MB.
                  </p>
                  {errors.image && (
                    <p className="mt-1 text-xs text-red-500">
                      {String(errors.image.message)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Nama Event */}
            <div className="grid gap-2">
              <Label htmlFor="title">Nama Event</Label>
              <Input
                id="title"
                placeholder="Contoh: Java Jazz Festival"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Kategori & Lokasi */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Kategori</Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Music">Musik</SelectItem>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                        <SelectItem value="Seminar">Seminar</SelectItem>
                        <SelectItem value="Sports">Olahraga</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-xs text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Lokasi</Label>
                <Input
                  id="location"
                  placeholder="Gedung / Link Zoom"
                  {...register("location")}
                />
                {errors.location && (
                  <p className="text-xs text-red-500">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            {/* Tanggal */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Mulai</Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  {...register("startDate")}
                />
                {errors.startDate && (
                  <p className="text-xs text-red-500">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">Selesai</Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  {...register("endDate")}
                />
                {errors.endDate && (
                  <p className="text-xs text-red-500">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Harga & Kuota */}
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label>Tipe Tiket</Label>
                <Controller
                  name="ticketType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || "Paid"}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Paid">Berbayar</SelectItem>
                        <SelectItem value="Free">Gratis</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="price">Harga (IDR)</Label>
                <Input
                  id="price"
                  type="number"
                  disabled={ticketType === "Free"}
                  {...register("price")}
                  className={ticketType === "Free" ? "bg-gray-100" : ""}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="seats">Kuota</Label>
                <Input
                  id="seats"
                  type="number"
                  {...register("availableSeats")}
                />
              </div>
            </div>

            {/* Deskripsi */}
            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi</Label>
              <textarea
                className="flex min-h-20 w-full rounded-md border border-blue-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
                id="description"
                placeholder="Detail event..."
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Menyimpan..."
                  : initialData
                    ? "Simpan Perubahan"
                    : "Buat Event"}
              </Button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 opacity-70 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
