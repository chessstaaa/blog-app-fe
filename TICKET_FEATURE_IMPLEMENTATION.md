# Ticket Feature - Code Examples & Implementation Guide

## 🔧 Implementation Details

### 1. API Client (`ticketApi.ts`)

```typescript
import { axiosInstance } from "./axios";
import { Ticket } from "@/types/ticket";

export const ticketApi = {
  // Fetch tickets untuk event tertentu
  getTicketsByEvent: async (eventId: number) => {
    const response = await axiosInstance.get<Ticket[]>("/ticket", {
      params: { eventId },
    });
    return response.data;
  },

  // Create single ticket
  createTicket: async (data: {
    eventId: number;
    name: string;
    price: number;
    quantityAvailable: number;
  }) => {
    const response = await axiosInstance.post<Ticket>("/ticket", data);
    return response.data;
  },

  // Delete ticket by ID
  deleteTicket: async (id: number) => {
    const response = await axiosInstance.delete<Ticket>(`/ticket/${id}`);
    return response.data;
  },
};
```

### 2. Custom Hook (`useTickets.ts`)

```typescript
export function useTickets(eventId: number | null) {
  const queryClient = useQueryClient();

  // Fetch tickets
  const { data: tickets, isPending } = useQuery({
    queryKey: ["tickets", eventId],
    queryFn: () => ticketApi.getTicketsByEvent(eventId!),
    enabled: !!eventId && !!session?.user?.userToken,
  });

  // Create ticket mutation
  const createTicketMutation = useMutation({
    mutationFn: (data: TicketData) => ticketApi.createTicket(data),
    onSuccess: () => {
      // Invalidate & refetch
      queryClient.invalidateQueries({ queryKey: ["tickets", eventId] });
    },
  });

  // Delete ticket mutation
  const deleteTicketMutation = useMutation({
    mutationFn: (id: number) => ticketApi.deleteTicket(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets", eventId] });
    },
  });

  return {
    tickets: tickets || [],
    isPending,
    createTicket: createTicketMutation.mutateAsync,
    deleteTicket: deleteTicketMutation.mutateAsync,
    isCreatingTicket: createTicketMutation.isPending,
    isDeletingTicket: deleteTicketMutation.isPending,
  };
}
```

## 💻 Component Usage Examples

### Menggunakan TicketViews di Page

```tsx
// src/app/dashboard/tickets/page.tsx
import { Suspense } from "react";
import { TicketViews } from "./components/TicketViews";

export const metadata = {
  title: "Ticket Management",
  description: "Manage your event tickets here",
};

export default function TicketsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <TicketViews />
    </Suspense>
  );
}
```

### TicketForm Validation

```tsx
// Validasi yang dijalankan:
{
  name: {
    required: "Ticket name is required",
    minLength: { value: 3, message: "Min 3 characters" }
  },
  price: {
    required: "Price is required",
    min: { value: 0, message: "Must be positive" }
  },
  quantityAvailable: {
    required: "Quantity is required",
    min: { value: 1, message: "At least 1" }
  }
}
```

### Event Selection Flow

```tsx
const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

// Filter: Jika event tidak dipilih
if (!selectedEventId) {
  return <div>Please select an event first</div>;
}

// Fetch tickets untuk event yang dipilih
const { tickets } = useTickets(selectedEventId);
```

## 📡 API Endpoint Mapping

| Operasi | Method | Endpoint | Backend Handler |
|---------|--------|----------|-----------------|
| Get Tickets | GET | `/ticket?eventId=:id` | `TicketController.getByEvent()` |
| Create Ticket | POST | `/ticket` | `TicketController.create()` |
| Create Bulk | POST | `/ticket/bulk` | `TicketController.createBulk()` |
| Delete Ticket | DELETE | `/ticket/:id` | `TicketController.deleteTicket()` |

## 🔄 Data Flow

```
User Interface
    ↓
TicketViews (Container)
    ↓
    ├── EventSelector (Choose Event)
    │   └── axiosInstance.get("/event/dashboard")
    │
    └── TicketList (Display & Manage)
        ├── useTickets Hook
        │   ├── GET /ticket?eventId=X
        │   ├── POST /ticket (create)
        │   └── DELETE /ticket/:id
        │
        ├── TicketCard (Display)
        └── TicketForm (Input)
```

## 🎯 State Management

### Query State
```typescript
// React Query Cache Keys
["events"]           // Event list untuk dropdown
["tickets", eventId] // Ticket list per event
```

### Mutation States
```typescript
// Automatic refetch setelah mutation
onSuccess: () => {
  queryClient.invalidateQueries({ 
    queryKey: ["tickets", eventId] 
  });
}
```

## ✋ Error Handling

```typescript
try {
  await createTicket(data);
  toast.success("Ticket created successfully!");
} catch (error: any) {
  // Backend error atau network error
  toast.error(error.message || "Failed to create ticket");
}
```

## 🔐 Authentication Flow

```typescript
// 1. Get token dari NextAuth session
const session = await getSession();

// 2. Axios interceptor otomatis add header
config.headers.Authorization = `Bearer ${session.user.userToken}`;

// 3. API calls include token automatically
await axiosInstance.get("/ticket", { params: { eventId } });
```

## 📊 Search & Sort Implementation

```typescript
// Search filtering
const filtered = tickets.filter((ticket) =>
  ticket.name.toLowerCase().includes(searchQuery.toLowerCase())
);

// Sort by name or price
filtered.sort((a, b) => {
  if (sortBy === "name") {
    return a.name.localeCompare(b.name);
  } else {
    return a.price - b.price;
  }
});
```

## 🎨 Styling Patterns

### Color System
```typescript
// Primary: Text & headings
text-blue-950      // Main heading
text-blue-500      // Subtitle

// Backgrounds
bg-blue-50         // Hover states
bg-gradient-to-r from-blue-50 to-indigo-50  // Card headers

// Accent
text-indigo-600    // Price display

// Borders
border-blue-100    // Subtle borders
border-blue-200    // Emphasis borders
```

### Responsive Grid
```typescript
// Mobile first approach
grid gap-6 md:grid-cols-2 lg:grid-cols-3

// Breakdown:
// Mobile (< 768px): 1 kolom
// Tablet (768px+):  2 kolom
// Desktop (1024px+): 3 kolom
```

## 🧪 Testing the Feature

### Manual Test Cases

1. **Event Selection**
   - [ ] Dropdown menampilkan semua events
   - [ ] Select event mengupdate state
   - [ ] Tiket loading setelah event dipilih

2. **Create Ticket**
   - [ ] Form validation bekerja
   - [ ] Success toast muncul
   - [ ] Ticket muncul di list
   - [ ] Form reset setelah create

3. **Search & Sort**
   - [ ] Search filter nama
   - [ ] Sort by name (ascending)
   - [ ] Sort by price (ascending)
   - [ ] Clear search reset list

4. **Delete Ticket**
   - [ ] Confirmation dialog muncul
   - [ ] Cancel tidak delete
   - [ ] Confirm delete dari list
   - [ ] Error handling jika gagal

5. **Error Handling**
   - [ ] Network error show toast
   - [ ] Validation error show in form
   - [ ] 401 redirect ke login
   - [ ] Empty state message

## 🚀 Performance Optimizations

1. **Query Caching**: React Query cache hasil
2. **Lazy Loading**: Suspense boundary untuk loading state
3. **Debounced Search**: Prevent excessive filtering
4. **Memoization**: useMemo untuk filtering logic
5. **Conditional Fetch**: Only fetch ketika event selected

## 🔗 Integration Points

### Dengan Features Lain
- **Events Management**: Select dari existing events
- **Dashboard**: Sidebar navigation
- **Auth**: NextAuth session untuk authorization
- **Notifications**: Sonner untuk toast messages

---

**File Locations**:
- API Client: `src/lib/ticketApi.ts`
- Hook: `src/hooks/useTickets.ts`
- Pages: `src/app/dashboard/tickets/`
- Components: `src/app/dashboard/tickets/components/`
