"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types/transaction";
import { StatusBadge } from "./StatusBadge";
import { Separator } from "@radix-ui/react-separator";

interface TransactionDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function TransactionDetailDialog({
  open,
  onOpenChange,
  transaction,
  onApprove,
  onReject,
}: TransactionDetailDialogProps) {
  if (!transaction) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-in fade-in-0 fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl border border-blue-100 bg-white p-6 shadow-xl duration-200">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-bold text-blue-900">
              Transaction Detail
            </Dialog.Title>
            <Dialog.Close className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none">
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            {/* Header Info */}
            <div className="flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50 p-4">
              <div>
                <p className="text-xs font-semibold text-blue-600">
                  {transaction.invoiceId}
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {transaction.eventName}
                </p>
              </div>
              <StatusBadge status={transaction.status} />
            </div>

            {/* Buyer Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-gray-500">Buyer</p>
                <p className="font-medium text-gray-900">
                  {transaction.buyerName}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Payment Total</p>
                <p className="font-bold text-blue-700">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(transaction.amount)}
                </p>
              </div>
            </div>

            <Separator className="h-px bg-gray-100" />

            {/* Payment Proof Section */}
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">
                Proof of Transfer
              </p>
              {transaction.paymentProof ? (
                <div className="group relative flex h-64 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                  {/* Image */}
                  <img
                    src={transaction.paymentProof}
                    alt="Proof"
                    className="h-full w-full object-contain"
                  />
                  <a
                    href={transaction.paymentProof}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 hidden items-center justify-center bg-black/40 text-sm font-medium text-white group-hover:flex"
                  >
                    Click to zoom
                  </a>
                </div>
              ) : (
                <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-sm text-gray-400">
                  <Clock className="mr-2 h-4 w-4" />
                  Waiting for proof upload...
                </div>
              )}
            </div>

            {/* Action Buttons (Hanya muncul jika status waiting_admin) */}
            {transaction.status === "waiting_admin" && (
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => onReject(transaction.id)}
                  variant="outline"
                  className="flex-1 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button
                  onClick={() => onApprove(transaction.id)}
                  className="flex-1 bg-green-600 text-white hover:bg-green-700"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
