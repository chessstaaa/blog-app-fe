import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema, PasswordFormValues } from "@/lib/validators/profile";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { axiosInstance } from "@/lib/axios";

export default function SecurityPage() {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const {
    register: registerPass,
    handleSubmit: handlePassSubmit,
    formState: { errors: passErrors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onChangePassword = async (data: PasswordFormValues) => {
    await write(data);
  };

  const { mutateAsync: write, isPending } = useMutation({
    mutationFn: async (data: PasswordFormValues) => {
      const mapData = {
        oldPassword: data.currentPassword,
        password: data.newPassword,
      };
      const token = session?.user?.userToken;
      await axiosInstance.post(`/user/update-password`, mapData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success("Update password success");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  return (
    <div className="mt-4 rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
      <h3 className="mb-4 border-b border-gray-100 pb-2 text-lg font-semibold text-blue-900">
        Change Password
      </h3>
      <form
        onSubmit={handlePassSubmit(onChangePassword)}
        className="max-w-lg space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            id="currentPassword"
            type="password"
            {...registerPass("currentPassword")}
          />
          {passErrors.currentPassword && (
            <p className="text-xs text-red-500">
              {String(passErrors.currentPassword.message)}
            </p>
          )}
        </div>

        <Separator className="my-2 h-px bg-gray-100" />

        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            {...registerPass("newPassword")}
          />
          {passErrors.newPassword && (
            <p className="text-xs text-red-500">
              {String(passErrors.newPassword.message)}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...registerPass("confirmPassword")}
          />
          {passErrors.confirmPassword && (
            <p className="text-xs text-red-500">
              {String(passErrors.confirmPassword.message)}
            </p>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="destructive"
            disabled={isPending}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            {isPending ? "Proccess..." : "Change Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
