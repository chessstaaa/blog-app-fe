# Ticket Management Feature

Fitur manajemen tiket untuk dashboard yang memungkinkan pengguna membuat, mengelola, dan menghapus tiket event.

## Struktur Folder

```
src/
├── app/dashboard/tickets/
│   ├── page.tsx                    # Halaman utama tickets
│   └── components/
│       ├── TicketViews.tsx         # Komponen utama views
│       ├── TicketList.tsx          # Daftar tiket dengan search & filter
│       ├── TicketCard.tsx          # Card individual tiket
│       ├── TicketForm.tsx          # Form untuk membuat/edit tiket
│       └── EventSelector.tsx       # Selector untuk memilih event
├── hooks/
│   └── useTickets.ts               # Custom hook untuk tiket operations
└── lib/
    └── ticketApi.ts                # API client untuk tiket
```

## Fitur-Fitur

### 1. Event Selection
- Pengguna dapat memilih event dari dropdown
- Menampilkan list event yang sudah dibuat di dashboard
- Tiket hanya bisa dibuat untuk event yang dipilih

### 2. Ticket Management
- **Create Ticket**: Tambahkan tiket baru dengan nama, harga, dan kuantitas
- **List Tickets**: Lihat semua tiket untuk event yang dipilih dengan pagination
- **Search Tickets**: Cari tiket berdasarkan nama
- **Sort Tickets**: Urutkan berdasarkan nama atau harga
- **Delete Ticket**: Hapus tiket dengan konfirmasi

### 3. User Interface
- Responsive design dengan grid layout
- Search bar dengan live filtering
- Sort dropdown untuk urutkan data
- Confirmation dialog sebelum delete
- Loading states dan error handling
- Toast notifications untuk feedback

## API Integration

Fitur ini terintegrasi dengan backend API sesuai arsitektur yang sudah dibuat:

### Endpoints:
- `GET /ticket?eventId=:id` - Ambil tiket berdasarkan event
- `POST /ticket` - Buat tiket baru
- `POST /ticket/bulk` - Buat multiple tiket sekaligus
- `DELETE /ticket/:id` - Hapus tiket

## Data Types

```typescript
type Ticket = {
  id: number;
  eventId: number;
  name: string;
  price: number;
  quantityAvailable: number;
};
```

## Usage

### Di Sidebar
Menu "Tickets" sudah ditambahkan ke sidebar navigation dengan path `/dashboard/tickets`

### Komponens
```tsx
// Menggunakan hook di komponen
import { useTickets } from "@/hooks/useTickets";

const { tickets, createTicket, deleteTicket } = useTickets(eventId);

// Create ticket
await createTicket({
  eventId: 1,
  name: "VIP Ticket",
  price: 100000,
  quantityAvailable: 50
});

// Delete ticket
await deleteTicket(ticketId);
```

## Styling

Menggunakan Tailwind CSS dengan color scheme blue:
- Primary: Blue-950 (text heading)
- Secondary: Blue-500 (subtitle)
- Accent: Indigo-600 (price display)
- Background: Blue-50 (hover states)

## Dependencies

- `@tanstack/react-query` - State management untuk API calls
- `next-auth` - Authentication
- `sonner` - Toast notifications
- `lucide-react` - Icons
- `react-hook-form` - Form management

## Fitur yang Belum Diimplementasikan

- Edit ticket (backend belum support update)
- Bulk create interface UI
- Ticket statistics/analytics
- Export tickets to CSV

## Notes

- Tiket tidak bisa dibuat tanpa memilih event terlebih dahulu
- Validasi form di frontend untuk name, price, dan quantity
- Error handling untuk API calls dengan toast notifications
- Auto-refresh list setelah create/delete operation
