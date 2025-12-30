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

const formSchema = z.object({
  email: z.email(),
});

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync: forgotPassword, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const result = await axiosInstance.post("/auth/forgot-password", {
        email: data.email,
      });

      return result.data;
    },

    onSuccess: async () => {
      toast.success("Reset link sent! Please check your email.");
      router.push("/login");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await forgotPassword(data);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Header Section (Pengganti CardHeader) */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to reset your password
        </p>
      </div>

      {/* Form Section */}
      <form id="form-forgot" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="grid gap-6">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="grid gap-2">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="m@example.com"
                  className="bg-background"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Button: Biru dan Wording yang benar */}
          <Button
            type="submit"
            form="form-forgot"
            disabled={isPending}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            {isPending ? "Sending..." : "Send Reset Link"}
          </Button>

          {/* Footer: Link kembali ke Login */}
          <div className="text-center text-sm">
            Remember your password?{" "}
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
