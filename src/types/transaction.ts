import { Event } from "./event";
import { UserTypes } from "./user";
import { Voucher } from "./voucher";

export type TransactionStatus =
  | "WAITING_FOR_PAYMENT"
  | "WAITING_FOR_ADMIN_CONFIRMATION"
  | "PAID"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELED";

export interface TransactionTypes {
  id: number;
  userId: number;
  user: UserTypes;
  eventId: number;
  event: Event;
  ticketId: number;
  voucherId: number;
  voucher: Voucher;
  quantity: number;
  price: number;
  status: TransactionStatus;
  paymentProofUrl: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  pointsUsed: number;
}
