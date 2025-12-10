"use client";

import React, { useState } from "react";
import { Plus, Tag, Calendar, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { VoucherForm } from "@/components/app/voucher/VoucherForm";
import { VoucherFormValues } from "@/lib/validators/voucher";

// Mock Data Awal
const initialVouchers = [
  {
    id: 1,
    code: "JAZZ50",
    eventName: "Java Jazz Festival 2024",
    type: "FIXED",
    amount: 50000,
    usageLimit: 100,
    used: 45,
    validUntil: "2024-05-20T23:59",
  },
  {
    id: 2,
    code: "EARLYBIRD",
    eventName: "Tech Startup Summit",
    type: "PERCENTAGE",
    amount: 10,
    usageLimit: 50,
    used: 50, // Sold out
    validUntil: "2024-06-01T12:00",
  },
];

export default function VouchersPage() {
  const [vouchers, setVouchers] = useState(initialVouchers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateVoucher = (data: VoucherFormValues) => {
    // Simulasi penambahan data (Di sini kita cari nama event berdasarkan ID manual utk demo)
    const newVoucher = {
      id: Math.random(),
      ...data,
      eventName: "Event ID " + data.eventId, // Mock name
      used: 0,
    };
    setVouchers([newVoucher, ...vouchers] as any);
    setIsModalOpen(false);
  };

  const formatAmount = (type: string, amount: number) => {
    if (type === "FIXED") {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(amount);
    }
    return `${amount}% OFF`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-950">
            Voucher & Promosi
          </h1>
          <p className="text-blue-500">
            Buat kode diskon untuk meningkatkan penjualan tiket.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Buat Voucher
        </Button>
      </div>

      <Separator className="h-[1px] bg-blue-100" />

      {/* List Voucher Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {vouchers.map((vc) => {
          const isExpired = new Date(vc.validUntil) < new Date();
          const isSoldOut = vc.used >= vc.usageLimit;
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
                    {isSoldOut ? "Habis" : "Kedaluwarsa"}
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
                  {formatAmount(vc.type, vc.amount)}
                </h3>
                <p className="mt-1 line-clamp-1 text-sm text-gray-500">
                  {vc.eventName}
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {/* Progress Bar Kuota */}
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-gray-500">Terpakai</span>
                    <span className="font-medium text-gray-900">
                      {vc.used} / {vc.usageLimit}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-blue-500 transition-all"
                      style={{ width: `${(vc.used / vc.usageLimit) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded bg-blue-50 p-2 text-xs text-gray-500">
                  <Calendar className="h-3.5 w-3.5 text-blue-400" />
                  <span>
                    Berlaku s.d{" "}
                    {new Date(vc.validUntil).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <VoucherForm
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleCreateVoucher}
      />
    </div>
  );
}
