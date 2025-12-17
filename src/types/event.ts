import { CategoryTypes } from "./category";

export interface EventTypes {
  id: number;
  organizerId: number;
  title: string;
  description: string;
  categoryId: number;
  category: CategoryTypes;
  location: string;
  price: number;
  startAt: string;
  endAt: string;
  totaSeats: number;
  availableSeats: number;
  isFree: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
}
