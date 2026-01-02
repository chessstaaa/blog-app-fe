"use client"
import { useTransactionStore } from "@/stores/transaction"
import { useState } from "react"
import { toast } from "sonner"

export default function UploadProofBox() {
  const upload = useTransactionStore(s => s.uploadProof)
  const tx = useTransactionStore(s => s.tx)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  if (!tx || tx.status !== "WAITING_FOR_PAYMENT") return null

  const handleUpload = async () => {
    if (!file) return toast.error("Upload proof first")
    try {
      setLoading(true)
      await upload(file)
      toast.success("Payment proof uploaded")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm space-y-3">
      <p className="font-semibold">Upload Payment Proof</p>

      <input
        type="file"
        onChange={e => setFile(e.target.files?.[0] || null)}
        className="input"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white px-6 py-2 rounded-xl"
      >
        {loading ? "Uploading..." : "Upload Payment Proof"}
      </button>
    </div>
  )
}
