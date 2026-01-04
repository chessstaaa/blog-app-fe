"use client";

import { Separator } from "@radix-ui/react-separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, ShieldCheck, User } from "lucide-react";
import AccountPage from "@/components/app/dashboardProfile/AccountPage";
import SecurityPage from "@/components/app/dashboardProfile/SecurityPage";
import { useQuery } from "@tanstack/react-query";
import { UserTypes } from "@/types/user";
import { axiosInstance } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { formatNumber } from "@/lib/utils";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const token = session?.user?.userToken;
      const user = await axiosInstance.get<UserTypes>("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return user.data;
    },
    enabled: status === "authenticated",
  });

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
              {formatNumber(user?.pointsBalance || 0)}{" "}
              <span className="text-lg font-normal opacity-80">PTS</span>
            </h2>
          </div>

          <div className="min-w-[200px] rounded-lg border border-white/20 bg-white/10 p-4 text-center">
            <p className="mb-2 text-xs tracking-widest text-blue-200 uppercase">
              Your Referral Code
            </p>
            <div className="cursor-pointer font-mono text-2xl font-bold tracking-wider select-all">
              {user?.referralCode}
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
          <AccountPage />
        </TabsContent>

        {/* --- TAB 2: Security (Password) --- */}
        <TabsContent value="security">
          <SecurityPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
