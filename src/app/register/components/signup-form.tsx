"use client";

import { Button } from "@/components/ui/button";
// Hapus Card, CardContent karena layout sudah dihandle page.tsx
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  email: z.email(),
  password: z.string().min(5, "Password must be at least 5 characters."),
});

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: register, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const result = await axiosInstance.post("/auth/register", {
        email: data.email,
        password: data.password,
        name: data.name,
      });
      return result.data;
    },
    onSuccess: () => {
      toast.success("Register success");
      router.push("/login");
    },
    onError: () => {
      toast.error("Register Failed");
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await register(data);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Header Section */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create your account
        </p>
      </div>

      {/* Form Section */}
      <form id="form-register" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="grid gap-6">
          {/* Name Field */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="grid gap-2">
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="John Doe"
                  className="bg-background"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Email Field */}
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

          {/* Password Field */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="grid gap-2">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Create a password"
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
            form="form-register"
            disabled={isPending}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            {isPending ? "Creating account..." : "Create Account"}
          </Button>

          {/* Footer Link */}
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="hover:text-primary underline underline-offset-4"
            >
              Sign in
            </Link>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
