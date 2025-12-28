// DATA SEMENTARA

export type Voucher = {
  id: number
  organizerId: number
  eventId: number
  code: string
  discountAmount: number
  startAt: string
  endAt: string
  usageLimit: number
  usedCount: number
}
