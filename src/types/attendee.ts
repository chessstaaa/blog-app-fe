export interface Attendee {
  id: string;
  eventId: string;
  name: string;
  email: string;
  ticketType: string;
  quantity: number;
  totalPaid: number;
  checkInStatus: boolean;
  purchaseDate: string;
}

export const initialAttendees: Attendee[] = [
  {
    id: "a1",
    eventId: "1",
    name: "Budi Santoso",
    email: "budi@example.com",
    ticketType: "VIP 3 Day Pass",
    quantity: 2,
    totalPaid: 3500000,
    checkInStatus: true,
    purchaseDate: "2024-03-10",
  },
  {
    id: "a2",
    eventId: "1",
    name: "Siti Aminah",
    email: "siti@example.com",
    ticketType: "Daily Pass",
    quantity: 1,
    totalPaid: 850000,
    checkInStatus: false,
    purchaseDate: "2024-03-12",
  },
  {
    id: "a3",
    eventId: "2",
    name: "Joko Widodo",
    email: "joko@example.com",
    ticketType: "Regular",
    quantity: 1,
    totalPaid: 150000,
    checkInStatus: false,
    purchaseDate: "2024-04-01",
  },
];

export const eventsList = [
  { id: "1", title: "Java Jazz Festival 2024" },
  { id: "2", title: "Tech Startup Summit" },
  { id: "3", title: "Workshop React 19" },
];
