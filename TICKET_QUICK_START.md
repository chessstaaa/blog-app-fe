# 🎫 Ticket Feature - Quick Start Guide

## ⚡ Quick Summary

Fitur **Ticket Management** telah berhasil ditambahkan ke dashboard dengan struktur yang clean, mengikuti best practices, dan tidak menghapus fitur yang sudah ada.

### ✨ Apa yang Bisa Dilakukan

1. **Create Tiket** - Tambahkan tiket baru untuk event
2. **List Tiket** - Lihat semua tiket dengan grid layout responsif
3. **Search Tiket** - Cari berdasarkan nama tiket
4. **Sort Tiket** - Urutkan by Name atau Price
5. **Delete Tiket** - Hapus tiket dengan konfirmasi
6. **Select Event** - Pilih event sebelum manage tiket

---

## 🚀 Cara Mulai

### 1. **Akses Menu**
Dari dashboard, klik menu **"Tickets"** di sidebar
```
Dashboard → Tickets
```

### 2. **Pilih Event**
Dropdown "Select Event" akan menampilkan semua events yang sudah dibuat
```
Klik dropdown → Pilih event
```

### 3. **Buat Ticket**
Klik tombol **"Add Ticket"** untuk membuka form
```
Isi Form:
- Ticket Name: "VIP", "Regular", "Student", dll
- Price: Harga dalam IDR (contoh: 100000)
- Quantity: Jumlah tiket tersedia (contoh: 50)

Klik "Create Ticket"
```

### 4. **Manage Tickets**
Setelah ticket dibuat, Anda bisa:

**Search**:
```
Ketik nama ticket di search bar
Hasil akan filter secara real-time
```

**Sort**:
```
Pilih "Name" atau "Price" dari dropdown
Ticket akan terurutkan otomatis
```

**Edit** (Coming Soon):
```
Klik tombol "Edit" di card ticket
(Feature ini akan diimplementasi saat backend support update)
```

**Delete**:
```
Klik tombol "Delete" di card ticket
Confirm dialog akan muncul
Klik OK untuk hapus
```

---

## 📁 File Locations

```
Halaman Utama     → src/app/dashboard/tickets/page.tsx
Views Container   → src/app/dashboard/tickets/components/TicketViews.tsx
API Client        → src/lib/ticketApi.ts
Custom Hook       → src/hooks/useTickets.ts
Sidebar Config    → src/static/sidebar.ts
```

---

## 🔧 Technical Details

### Endpoints Digunakan
```
GET    /ticket?eventId=:id       Ambil tiket
POST   /ticket                   Buat tiket
DELETE /ticket/:id               Hapus tiket
```

### Teknologi
```
React Query   - State management & caching
NextAuth      - Authorization
Sonner        - Toast notifications
Tailwind CSS  - Styling
React Hook Form - Form validation
```

### Authorization
- Otomatis menggunakan token dari NextAuth session
- Axios interceptor auto-inject Bearer token
- Jika 401, akan redirect ke login

---

## 💡 Tips & Tricks

### 1. **Form Validation**
```
❌ Name: Minimal 3 karakter
❌ Price: Harus angka positif
❌ Quantity: Minimal 1
```

### 2. **Empty States**
```
Jika belum select event:
→ "Please select an event to manage its tickets"

Jika event selected tapi belum ada ticket:
→ "No tickets created yet" + Create button
```

### 3. **Loading States**
```
Saat fetch data dari API:
→ "Loading tickets..."

Saat submit form:
→ Button disabled + text "Creating..." / "Updating..."
```

### 4. **Error Handling**
```
Jika ada error:
→ Toast notification dengan pesan error
→ Form tetap terbuka untuk retry
```

### 5. **Success Notification**
```
Setelah berhasil:
→ Toast success muncul
→ Form auto-close
→ List auto-refresh
```

---

## 📊 UI Components Breakdown

### Page Structure
```
TicketViews (Container)
├── Heading & Description
├── EventSelector
│   └── Dropdown untuk select event
└── TicketList
    ├── Add Ticket Button
    ├── TicketForm (kalau form open)
    ├── Search & Sort Bar
    └── TicketCard Grid
        ├── TicketCard 1
        ├── TicketCard 2
        └── TicketCard 3...
```

### Responsive Grid
```
Mobile  (< 768px):  1 kolom
Tablet  (768px+):   2 kolom
Desktop (1024px+):  3 kolom
```

### Color Scheme
```
Heading:      Blue-950 (dark blue)
Subtitle:     Blue-500 (lighter blue)
Price:        Indigo-600 (violet)
Border:       Blue-100 (very light blue)
Hover:        Blue-50 (light background)
```

---

## ❓ FAQ

**Q: Bisa edit ticket yang sudah dibuat?**
A: Belum, tunggu backend support update endpoint. Saat ini bisa delete & create baru.

**Q: Harus select event dulu sebelum buat ticket?**
A: Ya, tiket harus terikat ke event tertentu.

**Q: Bisa buat multiple ticket sekaligus?**
A: Backend support bulk create, tapi UI belum. Next phase feature.

**Q: Data tiket tersimpan dimana?**
A: Di database backend, disinkronisasi via API.

**Q: Berapa batas maksimal tiket per event?**
A: Tidak ada limit, tergantung database.

**Q: Format currency apa yang digunakan?**
A: IDR (Indonesian Rupiah) dengan format Rp X.XXX

---

## 🔐 Security Notes

- ✅ Semua API calls include authorization header
- ✅ Delete memerlukan konfirmasi
- ✅ Form validation di frontend & backend
- ✅ Session-based authentication
- ✅ Redirect ke login jika token expired

---

## 🐛 Troubleshooting

### Event Dropdown Kosong
```
→ Pastikan sudah create event di menu Events
→ Refresh halaman (Ctrl+R)
→ Check browser console untuk error
```

### Form Tidak Bisa Submit
```
→ Pastikan semua field terisi & valid
→ Check form validation errors
→ Pastikan network connection normal
```

### Ticket Tidak Muncul Setelah Create
```
→ Tunggu loading state selesai
→ Lihat toast notification untuk status
→ Refresh halaman jika masih tidak muncul
```

### Delete Tidak Berhasil
```
→ Buka browser console (F12)
→ Lihat error message
→ Pastikan tidak ada network error
```

---

## 📚 Related Documentation

- `TICKET_FEATURE_SUMMARY.md` - Dokumentasi lengkap feature
- `TICKET_FEATURE_IMPLEMENTATION.md` - Detail teknis & code examples
- `TICKET_FILE_STRUCTURE.md` - Struktur folder & file mapping
- `src/app/dashboard/tickets/README.md` - In-feature documentation

---

## 🎯 Next Steps (Future Enhancements)

- [ ] Edit ticket functionality
- [ ] Bulk create UI & form
- [ ] Ticket statistics dashboard
- [ ] Export to CSV
- [ ] Advanced filtering
- [ ] Ticket templates library
- [ ] Analytics & reporting

---

## ✅ Checklist - Sebelum Go Live

- [x] Semua fitur sudah test manual
- [x] No console errors
- [x] Responsive design work
- [x] Authorization working
- [x] Toast notifications showing
- [x] Form validation working
- [x] Empty states handled
- [x] Loading states working
- [x] Error handling in place
- [x] Sidebar menu added
- [x] Documentation complete

---

**Status**: ✅ Ready to Use
**Last Updated**: January 5, 2026
**Version**: 1.0

Enjoy managing your event tickets! 🎉
