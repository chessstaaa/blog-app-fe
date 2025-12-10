export type TransactionStatus =
  | "waiting_payment"
  | "waiting_admin"
  | "done"
  | "rejected"
  | "expired"
  | "canceled";

export interface Transaction {
  id: string;
  invoiceId: string;
  eventName: string;
  buyerName: string;
  date: string;
  amount: number;
  status: TransactionStatus;
  paymentProof?: string;
}

// Mock Data
export const initialTransactions: Transaction[] = [
  {
    id: "tx1",
    invoiceId: "INV-2025001",
    eventName: "Java Jazz Festival 2024",
    buyerName: "Budi Santoso",
    date: "2024-05-10T14:30:00",
    amount: 350000,
    status: "waiting_admin",
    paymentProof:
      "https://images.unsplash.com/photo-1550523724-c184285b5463?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "tx2",
    invoiceId: "INV-2025002",
    eventName: "Tech Startup Summit",
    buyerName: "Siti Aminah",
    date: "2024-05-11T09:15:00",
    amount: 150000,
    status: "done",
    paymentProof:
      "https://images.unsplash.com/photo-1550523724-c184285b5463?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "tx3",
    invoiceId: "INV-2025003",
    eventName: "Workshop React 19",
    buyerName: "Joko Widodo",
    date: "2024-05-12T10:00:00",
    amount: 75000,
    status: "waiting_payment",
  },
];
