"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Link from "next/link";

interface ResetPasswordFormProps extends React.ComponentProps<"div"> {
  token: string;
}

const formSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function ResetPasswordForm({
  className,
  token,
  ...props
}: ResetPasswordFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync: resetPassword, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const result = await axiosInstance.post(
        "/auth/reset-password",
        {
          password: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return result.data;
    },

    onSuccess: async () => {
      toast.success("Password reset successfully!");
      router.push("/login");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await resetPassword(data);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Header Section */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Set new password</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your new password below to reset your account access.
        </p>
      </div>

      {/* Form Section */}
      <form id="form-reset-password" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="grid gap-6">
          {/* New Password */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="grid gap-2">
                <FieldLabel htmlFor="password">New Password</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Create new password"
                  className="bg-background"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Confirm Password */}
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="grid gap-2">
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>
                <Input
                  {...field}
                  id="confirmPassword"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Repeat new password"
                  className="bg-background"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            form="form-reset-password"
            disabled={isPending}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            {isPending ? "Resetting..." : "Reset Password"}
          </Button>

          {/* Optional: Back to Login link */}
          <div className="text-center text-sm">
            <Link
              href="/login"
              className="hover:text-primary underline underline-offset-4"
            >
              Back to Login
            </Link>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
