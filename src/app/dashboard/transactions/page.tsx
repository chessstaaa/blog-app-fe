"use client";

import React, { useState } from "react";
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
import { TransactionTypes } from "@/types/transaction";
import { StatusBadge } from "@/components/app/transaction/StatusBadge";
import { TransactionDetailDialog } from "@/components/app/transaction/TransactionDetailDialog";
import { Separator } from "@radix-ui/react-separator";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useDebounce } from "@/lib/utils";

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedTx, setSelectedTx] = useState<TransactionTypes | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDetail = (transaction: TransactionTypes) => {
    setSelectedTx(transaction);
    setIsDialogOpen(true);
  };

  const { data: transactions, isPending } = useQuery({
    queryKey: ["transactions", debouncedSearch, filterStatus],
    queryFn: async () => {
      const transactions = await axiosInstance.get<TransactionTypes[]>(
        "/transactions/dashboard",
      );
      return transactions.data;
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-950">Transaction</h1>
        <p className="text-blue-500">
          Manage payments and confirm ticket orders.
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
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="waiting_admin">
                Waiting For Confirmation
              </SelectItem>
              <SelectItem value="waiting_payment">
                Waiting For Payment
              </SelectItem>
              <SelectItem value="done">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
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
                <th className="px-4 py-3">Buyer</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isPending && (
                <div className="col-span-3 my-16 text-center">
                  <p className="text-2xl font-bold">Loading...</p>
                </div>
              )}
              {transactions ? (
                transactions?.map((tx) => (
                  <tr
                    key={tx.id}
                    className="transition-colors hover:bg-blue-50/50"
                  >
                    <td className="px-4 py-3 font-mono text-xs font-medium text-gray-500">
                      {tx.id}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {tx.event.title}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{tx.user.name}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(tx.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 font-semibold text-blue-700">
                      {new Intl.NumberFormat("id-ID").format(tx.totalPrice)}
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
                        {tx.status === "WAITING_FOR_ADMIN_CONFIRMATION"
                          ? "Verification"
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
                    No transactions found.
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
      />
    </div>
  );
}
