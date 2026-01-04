import { Event } from "./event";

export type Voucher = {
  id: number;
  organizerId: number;
  eventId: number;
  event: Event;
  code: string;
  discountAmount: number;
  startAt: string;
  endAt: string;
  usageLimit: number;
  usedCount: number;
};
