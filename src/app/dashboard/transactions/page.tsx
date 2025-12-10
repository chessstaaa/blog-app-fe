"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Transaction,
  initialTransactions,
  TransactionStatus,
} from "@/types/transaction";
import { StatusBadge } from "@/components/app/transaction/StatusBadge";
import { TransactionDetailDialog } from "@/components/app/transaction/TransactionDetailDialog";
import { Separator } from "@radix-ui/react-separator";

// Utility Hook untuk Debounce (Mencegah search berjalan setiap ketikan)
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500); // Delay 500ms
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // --- LOGIKA FILTERING ---
  const filteredData = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch =
        t.buyerName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        t.invoiceId.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ? true : t.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [transactions, debouncedSearch, filterStatus]);

  // --- LOGIKA APPROVE/REJECT ---
  const handleApprove = (id: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "done" } : t)),
    );
    setIsDialogOpen(false);
  };

  const handleReject = (id: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "rejected" } : t)),
    );
    setIsDialogOpen(false);
  };

  const openDetail = (transaction: Transaction) => {
    setSelectedTx(transaction);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-950">Transaksi</h1>
        <p className="text-blue-500">
          Kelola pembayaran dan konfirmasi pesanan tiket.
        </p>
      </div>

      <Separator className="h-px bg-blue-100" />

      {/* Toolbar: Search & Filter */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari Invoice ID atau Nama Pembeli..."
            className="border-blue-200 bg-white pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full md:w-[200px]">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="border-blue-200 bg-white">
              <Filter className="mr-2 h-4 w-4 text-blue-500" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="waiting_admin">Perlu Konfirmasi</SelectItem>
              <SelectItem value="waiting_payment">
                Menunggu Pembayaran
              </SelectItem>
              <SelectItem value="done">Selesai</SelectItem>
              <SelectItem value="rejected">Ditolak</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabel Transaksi */}
      <div className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-blue-100 bg-blue-50 font-semibold text-blue-900">
              <tr>
                <th className="px-4 py-3">Invoice</th>
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3">Pembeli</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length > 0 ? (
                filteredData.map((tx) => (
                  <tr
                    key={tx.id}
                    className="transition-colors hover:bg-blue-50/50"
                  >
                    <td className="px-4 py-3 font-mono text-xs font-medium text-gray-500">
                      {tx.invoiceId}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {tx.eventName}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{tx.buyerName}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(tx.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 font-semibold text-blue-700">
                      {new Intl.NumberFormat("id-ID").format(tx.amount)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:bg-blue-50 hover:text-blue-800"
                        onClick={() => openDetail(tx)}
                      >
                        {tx.status === "waiting_admin"
                          ? "Verifikasi"
                          : "Detail"}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-gray-500"
                  >
                    Tidak ada transaksi yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <TransactionDetailDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        transaction={selectedTx}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
