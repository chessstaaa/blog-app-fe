import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileFormValues } from "@/lib/validators/profile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { UserTypes } from "@/types/user";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function AccountPage() {
  const session = useSession();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await axiosInstance.get<UserTypes>("/user", {
        headers: { Authorization: `Bearer ${session.data?.user.userToken}` },
      });
      return user.data;
    },
  });

  useEffect(() => {
    reset({
      name: user?.name,
      email: user?.email,
    });
  }, [user]);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onUpdateProfile = async (data: ProfileFormValues) => {
    await write(data);
  };

  const { mutateAsync: write, isPending } = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      const mapData = {
        name: data.name,
      };

      await axiosInstance.post(`/user/update-profile`, mapData, {
        headers: { Authorization: `Bearer ${session.data?.user.userToken}` },
      });
    },
    onSuccess: () => {
      toast.success("Update profile success");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  return (
    <div className="mt-4 rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
      <h3 className="mb-4 border-b border-gray-100 pb-2 text-lg font-semibold text-blue-900">
        Basic Information
      </h3>
      <form
        onSubmit={handleProfileSubmit(onUpdateProfile)}
        className="max-w-2xl space-y-6"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" {...registerProfile("name")} />
          {profileErrors.name && (
            <p className="text-xs text-red-500">
              {String(profileErrors.name.message)}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            {...registerProfile("email")}
            disabled
            className="cursor-not-allowed bg-gray-100 text-gray-500"
          />
          <p className="text-[10px] text-gray-400">
            The email cannot be changed because it is linked to your login.
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Process..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
