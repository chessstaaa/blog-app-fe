"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ticket } from "@/types/ticket";

interface TicketFormProps {
  onSubmit: (data: {
    name: string;
    price: number;
    quantityAvailable: number;
  }) => Promise<any>;
  initialData?: Ticket;
  isLoading?: boolean;
  onCancel?: () => void;
}

export function TicketForm({
  onSubmit,
  initialData,
  isLoading,
  onCancel,
}: TicketFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: initialData?.name || "",
      price: initialData?.price || 0,
      quantityAvailable: initialData?.quantityAvailable || 0,
    },
  });

  const onFormSubmit = async (data: any) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {/* Ticket Name */}
      <div>
        <Label htmlFor="name" className="text-blue-950 font-semibold">
          Ticket Name
        </Label>
        <Input
          id="name"
          placeholder="e.g., VIP, General Admission, Early Bird"
          {...register("name", {
            required: "Ticket name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          })}
          className="mt-1"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Price */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price" className="text-blue-950 font-semibold">
            Price
          </Label>
          <Input
            id="price"
            type="number"
            placeholder="0"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
              valueAsNumber: true,
            })}
            className="mt-1"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <Label
            htmlFor="quantityAvailable"
            className="text-blue-950 font-semibold"
          >
            Quantity Available
          </Label>
          <Input
            id="quantityAvailable"
            type="number"
            placeholder="0"
            {...register("quantityAvailable", {
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" },
              valueAsNumber: true,
            })}
            className="mt-1"
          />
          {errors.quantityAvailable && (
            <p className="text-red-500 text-sm mt-1">
              {errors.quantityAvailable.message}
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          className="flex-1"
          disabled={isLoading}
        >
          {isLoading
            ? initialData
              ? "Updating..."
              : "Creating..."
            : initialData
              ? "Update Ticket"
              : "Create Ticket"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
