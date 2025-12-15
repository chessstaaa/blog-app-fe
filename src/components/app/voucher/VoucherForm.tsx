"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { voucherSchema, VoucherFormValues } from "@/lib/validators/voucher";
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
import { X, Ticket } from "lucide-react";

// Mock Data Event untuk Dropdown (Nanti dari API/Database)
const activeEvents = [
  { id: "1", title: "Java Jazz Festival 2024" },
  { id: "2", title: "Tech Startup Summit" },
  { id: "3", title: "Workshop React 19" },
];

interface VoucherFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: VoucherFormValues) => void;
}

export function VoucherForm({
  open,
  onOpenChange,
  onSubmit,
}: VoucherFormProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(voucherSchema),
    defaultValues: {
      code: "",
      eventId: "",
      amount: 0,
      type: "FIXED",
      usageLimit: 100,
      validUntil: "",
    },
  });

  const voucherType = watch("type");

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-in fade-in-0 fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl border border-blue-100 bg-white p-6 shadow-xl duration-200">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <Dialog.Title className="flex items-center gap-2 text-xl font-bold text-blue-900">
              <Ticket className="h-5 w-5 text-blue-600" />
              Create New Voucher
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500">
              Create discount codes to attract more buyers.
            </Dialog.Description>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-2">
            {/* Kode Voucher */}
            <div className="grid gap-2">
              <Label htmlFor="code">Voucher Code (Unique)</Label>
              <Input
                id="code"
                placeholder="Ex: EXX50"
                className="border-2 border-dashed border-blue-200 font-mono tracking-wider uppercase focus:border-blue-500"
                {...register("code")}
              />
              {errors.code && (
                <p className="text-xs text-red-500">{errors.code.message}</p>
              )}
            </div>

            {/* Select Event */}
            <div className="grid gap-2">
              <Label>Valid for Events</Label>
              <Controller
                name="eventId"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Event..." />
                    </SelectTrigger>
                    <SelectContent>
                      {activeEvents.map((event) => (
                        <SelectItem key={event.id} value={event.id}>
                          {event.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.eventId && (
                <p className="text-xs text-red-500">{errors.eventId.message}</p>
              )}
            </div>

            {/* Tipe & Nilai Potongan */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Discount Type</Label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FIXED">Price (Rp)</SelectItem>
                        <SelectItem value="PERCENTAGE">
                          Percentage (%)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="amount">
                  {voucherType === "FIXED" ? "Price (Rp)" : "Percentage (%)"}
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  {...register("amount")}
                />
                {errors.amount && (
                  <p className="text-xs text-red-500">
                    {errors.amount.message}
                  </p>
                )}
              </div>
            </div>

            {/* Kuota & Tanggal */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="usageLimit">Usage Quota</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  {...register("usageLimit")}
                />
                {errors.usageLimit && (
                  <p className="text-xs text-red-500">
                    {errors.usageLimit.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="validUntil">Valid Until</Label>
                <Input
                  id="validUntil"
                  type="datetime-local"
                  {...register("validUntil")}
                />
                {errors.validUntil && (
                  <p className="text-xs text-red-500">
                    {errors.validUntil.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-2 flex justify-end gap-3 border-t border-gray-100 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Create Voucher
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
