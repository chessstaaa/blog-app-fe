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
import { X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { CategoryTypes } from "@/types/category";

interface EventFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: EventFormValues | null;
}

export function EventForm({ open, onOpenChange, initialData }: EventFormProps) {
  const router = useRouter();
  const session = useSession();
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
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

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        startDate: new Date(initialData.startDate).toISOString().slice(0, 16),
        endDate: new Date(initialData.endDate).toISOString().slice(0, 16),
      });
      if (typeof initialData.image === "string") {
        setImagePreview(initialData.image);
      }
    } else {
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
      setValue("image", file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  const submitHandler = (data: EventFormValues) => {
    write(data);
  };

  const { mutateAsync: write, isPending } = useMutation({
    mutationFn: async (data: EventFormValues) => {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("categoryId", data.category);
      formData.append("location", data.location);
      formData.append("price", data.price.toString());
      formData.append("startAt", new Date(data.startDate).toISOString());
      formData.append("endAt", new Date(data.endDate).toISOString());
      formData.append("totaSeats", data.availableSeats.toString());
      formData.append("isFree", String(data.ticketType === "Free"));
      formData.append("image", data.image);

      await axiosInstance.post(`/event`, formData, {
        headers: { Authorization: `Bearer ${session.data?.user.userToken}` },
      });
    },
    onSuccess: () => {
      toast.success("Create event success");
      queryClient.invalidateQueries({ queryKey: ["event"] });
      onOpenChange(false);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const categories = await axiosInstance.get<CategoryTypes[]>("/category");
      return categories.data;
    },
  });

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

            {/* Event Name */}
            <div className="grid gap-2">
              <Label htmlFor="title">Event Name</Label>
              <Input
                id="title"
                placeholder="Ex: Band Festival"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Category & Location */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Category</Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
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
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Building / Zoom Link"
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
                <Label htmlFor="startDate">Start</Label>
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
                <Label htmlFor="endDate">End</Label>
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

            {/* Price & Quota */}
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label>Ticket Type</Label>
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
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Free">Free</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="price">Price (IDR)</Label>
                <Input
                  id="price"
                  type="number"
                  disabled={ticketType === "Free"}
                  {...register("price")}
                  className={ticketType === "Free" ? "bg-gray-100" : ""}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="seats">Quota</Label>
                <Input
                  id="seats"
                  type="number"
                  {...register("availableSeats")}
                />
              </div>
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
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
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending
                  ? "Saving..."
                  : initialData
                    ? "Save Changes"
                    : "Create Event"}
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
