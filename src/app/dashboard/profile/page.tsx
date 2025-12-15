"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSchema,
  passwordSchema,
  ProfileFormValues,
  PasswordFormValues,
} from "@/lib/validators/profile";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, ShieldCheck, User } from "lucide-react";

// Mock Data User (Tanpa Avatar)
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  referralCode: "JOHNDOE88",
  points: 45000,
  pointsExpiry: "2026-03-25",
};

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onUpdateProfile = (data: ProfileFormValues) => {
    setTimeout(() => {
      setUser({ ...user, name: data.name });
      alert("Profil berhasil diperbarui!");
    }, 1000);
  };

  const {
    register: registerPass,
    handleSubmit: handlePassSubmit,
    formState: { errors: passErrors, isSubmitting: isPassSubmitting },
    reset: resetPass,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onChangePassword = (data: PasswordFormValues) => {
    setTimeout(() => {
      alert("Password berhasil diubah!");
      resetPass();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-950">Account Settings</h1>
        <p className="text-blue-500">
          Manage your personal profile and account security.
        </p>
      </div>

      <Separator className="h-px bg-blue-100" />

      {/* --- REWARDS CARD --- */}
      <div className="relative overflow-hidden rounded-xl bg-linear-to-r from-blue-600 to-blue-800 p-6 text-white shadow-lg">
        <div className="relative z-10 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <p className="mb-1 flex items-center gap-2 text-sm font-medium text-blue-100">
              <Gift className="h-4 w-4" /> Point Balance
            </p>
            <h2 className="text-4xl font-bold tracking-tight">
              {new Intl.NumberFormat("id-ID").format(user.points)}{" "}
              <span className="text-lg font-normal opacity-80">PTS</span>
            </h2>
            <p className="mt-2 inline-block rounded bg-white/10 px-2 py-1 text-xs text-blue-200">
              Expires on:{" "}
              {new Date(user.pointsExpiry).toLocaleDateString("id-ID", {
                dateStyle: "long",
              })}
            </p>
          </div>

          <div className="min-w-[200px] rounded-lg border border-white/20 bg-white/10 p-4 text-center">
            <p className="mb-2 text-xs tracking-widest text-blue-200 uppercase">
              Your Referral Code
            </p>
            <div className="cursor-pointer font-mono text-2xl font-bold tracking-wider select-all">
              {user.referralCode}
            </div>
            <p className="mt-2 text-[10px] text-blue-200">
              Share to get 10,000 Points!
            </p>
          </div>
        </div>

        {/* Dekorasi Background */}
        <div className="pointer-events-none absolute -right-6 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
      </div>

      {/* --- TABS SECTION --- */}
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="account" className="gap-2">
            <User className="h-4 w-4" /> Account
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <ShieldCheck className="h-4 w-4" /> Security
          </TabsTrigger>
        </TabsList>

        {/* --- TAB 1: Edit Profile (Tanpa Avatar) --- */}
        <TabsContent value="account">
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
                  The email cannot be changed because it is linked to your
                  login.
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={isProfileSubmitting}>
                  {isProfileSubmitting ? "Process..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>

        {/* --- TAB 2: Security (Password) --- */}
        <TabsContent value="security">
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
                  disabled={isPassSubmitting}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  {isPassSubmitting ? "Proccess..." : "Change Password"}
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
