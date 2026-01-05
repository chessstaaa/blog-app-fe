import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ticketApi } from "@/lib/ticketApi";
import { Ticket } from "@/types/ticket";
import { useSession } from "next-auth/react";

export function useTickets(eventId: number | null) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: tickets, isPending, error, refetch } = useQuery({
    queryKey: ["tickets", eventId],
    queryFn: () => ticketApi.getTicketsByEvent(eventId!),
    enabled: !!eventId && !!session?.user?.userToken,
  });

  const createTicketMutation = useMutation({
    mutationFn: (data: {
      eventId: number;
      name: string;
      price: number;
      quantityAvailable: number;
    }) => ticketApi.createTicket(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets", eventId] });
    },
  });

  const createBulkTicketsMutation = useMutation({
    mutationFn: (
      tickets: Array<{
        eventId: number;
        name: string;
        price: number;
        quantityAvailable: number;
      }>
    ) => ticketApi.createBulkTickets(tickets),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets", eventId] });
    },
  });

  const deleteTicketMutation = useMutation({
    mutationFn: (id: number) => ticketApi.deleteTicket(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets", eventId] });
    },
  });

  return {
    tickets: tickets || [],
    isPending,
    error,
    refetch,
    createTicket: createTicketMutation.mutateAsync,
    createBulkTickets: createBulkTicketsMutation.mutateAsync,
    deleteTicket: deleteTicketMutation.mutateAsync,
    isCreatingTicket: createTicketMutation.isPending,
    isCreatingBulk: createBulkTicketsMutation.isPending,
    isDeletingTicket: deleteTicketMutation.isPending,
  };
}
