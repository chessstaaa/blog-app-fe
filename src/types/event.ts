// DATA SEMENTARA

export type Event = {
  id: number
  slug: string
  title: string
  description: string
  location: string
  price: number
  startAt: string
  endAt: string
  totalSeats: number
  availableSeats: number
  isFree: boolean
  image: string

  category: {
    id: number
    name: string
  }

  organizer: {
    id: number
    name: string
    avatar?: string
  }
}