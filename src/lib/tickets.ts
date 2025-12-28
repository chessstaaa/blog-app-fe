// DATA SEMENTARA

import { Ticket } from "@/types/ticket";


export const tickets: Ticket[] = [
  // Abu Dhabi GP
  { id: 1, eventId: 1, name: "3-Day General Admission", price: 750000, quantityAvailable: 1200 },
  { id: 2, eventId: 1, name: "Grandstand South", price: 1500000, quantityAvailable: 500 },
  { id: 3, eventId: 1, name: "Main Grandstand", price: 2800000, quantityAvailable: 300 },
  { id: 4, eventId: 1, name: "Paddock Club Hospitality", price: 15000000, quantityAvailable: 60 },

  // Australian GP
  { id: 5, eventId: 2, name: "3-Day Park Pass", price: 650000, quantityAvailable: 1500 },
  { id: 6, eventId: 2, name: "Brabham Grandstand", price: 1700000, quantityAvailable: 600 },
  { id: 7, eventId: 2, name: "Champions Club", price: 6200000, quantityAvailable: 120 },

  // Bahrain GP
  { id: 8, eventId: 3, name: "2-Day General Admission", price: 580000, quantityAvailable: 1300 },
  { id: 9, eventId: 3, name: "Main Grandstand", price: 1400000, quantityAvailable: 550 },
  { id: 10, eventId: 3, name: "VIP Lounge", price: 4500000, quantityAvailable: 180 },

  // Singapore Night GP
  { id: 11, eventId: 4, name: "Zone 4 Walkabout", price: 800000, quantityAvailable: 1600 },
  { id: 12, eventId: 4, name: "Pit Grandstand", price: 2100000, quantityAvailable: 500 },
  { id: 13, eventId: 4, name: "Premier Walkabout", price: 3500000, quantityAvailable: 350 },
  { id: 14, eventId: 4, name: "Paddock Club", price: 18000000, quantityAvailable: 50 },

  // Jakarta Tech Meetup (FREE)
  { id: 15, eventId: 5, name: "Free Admission", price: 0, quantityAvailable: 120 },

  // We The Fest 2025 (Music)
  { id: 16, eventId: 6, name: "Daily Pass", price: 450000, quantityAvailable: 2500 },
  { id: 17, eventId: 6, name: "3-Day Festival Pass", price: 950000, quantityAvailable: 3000 },
  { id: 18, eventId: 6, name: "VIP Backstage", price: 2500000, quantityAvailable: 500 },

  // Jakarta Art Week (Arts)
  { id: 19, eventId: 7, name: "General Visitor", price: 120000, quantityAvailable: 1000 },
  { id: 20, eventId: 7, name: "Collector Lounge", price: 850000, quantityAvailable: 200 },
  { id: 21, eventId: 7, name: "Private Gallery Tour", price: 1500000, quantityAvailable: 80 },

  // Midnight Club Jakarta (Nightlife)
  { id: 22, eventId: 8, name: "Regular Entry", price: 350000, quantityAvailable: 600 },
  { id: 23, eventId: 8, name: "VIP Table", price: 2500000, quantityAvailable: 200 },
  { id: 24, eventId: 8, name: "Backstage Access", price: 5500000, quantityAvailable: 100 },
]