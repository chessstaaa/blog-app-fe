"use client";

import { useState } from "react";
import { Plus, Tag, Calendar, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { VoucherForm } from "@/components/app/voucher/VoucherForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Voucher } from "@/types/voucher";
import { formatIDR } from "@/lib/utils";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function VouchersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: deleteVoucher, isPending: pendingDelete } = useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(`/voucher/${id}`);
    },
    onSuccess: () => {
      toast.success("Create voucher success");
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  const { data: vouchers, isPending } = useQuery({
    queryKey: ["vouchers"],
    queryFn: async () => {
      const blogs = await axiosInstance.get<Voucher[]>("/voucher");
      return blogs.data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-950">
            Vouchers & Promotions
          </h1>
          <p className="text-blue-500">
            Create discount codes to increase ticket sales.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Create Voucher
        </Button>
      </div>

      <Separator className="h-px bg-blue-100" />

      {/* List Voucher Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isPending && (
          <div className="col-span-3 my-16 text-center">
            <p className="text-2xl font-bold">Loading...</p>
          </div>
        )}

        {vouchers?.map((vc) => {
          const isExpired = new Date(vc.endAt) < new Date();
          const isSoldOut = vc.usedCount >= vc.usageLimit;
          const isActive = !isExpired && !isSoldOut;

          return (
            <div
              key={vc.id}
              className={`relative flex flex-col justify-between rounded-xl border p-5 shadow-sm transition-all ${
                isActive
                  ? "border-blue-100 bg-white hover:border-blue-300"
                  : "border-gray-200 bg-gray-50 opacity-75"
              }`}
            >
              {/* Badge Status */}
              <div className="absolute top-4 right-4">
                {isActive ? (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                    Active
                  </span>
                ) : (
                  <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-bold text-gray-600">
                    {isSoldOut ? "Sold" : "Expired"}
                  </span>
                )}
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2 text-blue-600">
                  <Tag className="h-5 w-5" />
                  <span className="font-mono text-xl font-bold tracking-widest">
                    {vc.code}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {formatIDR(vc.discountAmount)}
                </h3>
                <p className="mt-1 line-clamp-1 text-sm text-gray-500">
                  {vc.event.title}
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {/* Progress Bar Kuota */}
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-gray-500">Used</span>
                    <span className="font-medium text-gray-900">
                      {vc.usedCount} / {vc.usageLimit}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-blue-500 transition-all"
                      style={{
                        width: `${(vc.usedCount / vc.usageLimit) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded bg-blue-50 p-2 text-xs text-gray-500">
                  <Calendar className="h-3.5 w-3.5 text-blue-400" />
                  <span>
                    Valid until{" "}
                    {new Date(vc.endAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div>
                  <Button
                    onClick={() => deleteVoucher(vc.id)}
                    disabled={pendingDelete}
                    className="w-full gap-2 bg-red-600 hover:bg-red-700"
                  >
                    <Trash className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <VoucherForm open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
