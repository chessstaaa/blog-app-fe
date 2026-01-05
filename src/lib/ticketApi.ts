import { axiosInstance } from "./axios";
import { Ticket } from "@/types/ticket";

export const ticketApi = {
  // Get all tickets for an event
  getTicketsByEvent: async (eventId: number) => {
    try {
      const response = await axiosInstance.get<Ticket[]>("/tickets", {
        params: { eventId },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error fetching tickets:", error.response?.data || error.message);
      throw error;
    }
  },

  // Create a single ticket
  createTicket: async (data: {
    eventId: number;
    name: string;
    price: number;
    quantityAvailable: number;
  }) => {
    try {
      const response = await axiosInstance.post<Ticket>("/tickets", data);
      return response.data;
    } catch (error: any) {
      console.error("Error creating ticket:", error.response?.data || error.message);
      throw error;
    }
  },

  // Create multiple tickets in bulk
  createBulkTickets: async (
    tickets: Array<{
      eventId: number;
      name: string;
      price: number;
      quantityAvailable: number;
    }>
  ) => {
    try {
      const response = await axiosInstance.post<Ticket[]>(
        "/tickets/bulk",
        tickets
      );
      return response.data;
    } catch (error: any) {
      console.error("Error creating bulk tickets:", error.response?.data || error.message);
      throw error;
    }
  },

  // Delete a ticket
  deleteTicket: async (id: number) => {
    try {
      const response = await axiosInstance.delete<Ticket>(
        `/tickets/${id}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error deleting ticket:", error.response?.data || error.message);
      throw error;
    }
  },
};
