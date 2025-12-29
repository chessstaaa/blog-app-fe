"use client";

import { Button } from "@/components/ui/button";
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
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(5, "Password must be at least 5 characters."),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const result = await axiosInstance.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      return result.data;
    },
    onSuccess: async (result) => {
      await signIn("credentials", {
        email: result.email,
        objectId: result.objectId,
        userToken: result.accessToken,
        role: result.role,
        redirect: false,
      });

      toast.success("Login success");
      router.push("/");
    },
    onError: () => {
      toast.error("Login failed");
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await login(data);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Header Section */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      {/* Form Section */}
      <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
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

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="grid gap-2">
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Your password"
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
            form="form-login"
            disabled={isPending}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            {isPending ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="hover:text-primary underline underline-offset-4"
            >
              Sign up
            </Link>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
