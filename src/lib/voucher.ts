// DATA SEMENTARA

import { Voucher } from "@/types/voucher";


export const vouchers: Voucher[] = [
  {
    id: 1,
    organizerId: 1,
    eventId: 1,
    code: "F1FAN100",
    discountAmount: 100000,
    startAt: "2025-01-01",
    endAt: "2025-12-31",
    usageLimit: 500,
    usedCount: 41,
  },
  {
    id: 2,
    organizerId: 1,
    eventId: 4,
    code: "NIGHT150",
    discountAmount: 150000,
    startAt: "2025-01-01",
    endAt: "2025-09-21",
    usageLimit: 300,
    usedCount: 82,
  }
]