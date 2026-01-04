import axios from "axios";
import { getSession } from "next-auth/react";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// ✅ Axios Interceptor: Otomatis ambil token dari NextAuth session
axiosInstance.interceptors.request.use(async (config) => {
  try {
    const session = await getSession();
    if (session?.user?.userToken) {
      config.headers.Authorization = `Bearer ${session.user.userToken}`;
    }
  } catch (error) {
    console.error("Error getting session:", error);
  }
  return config;
});

// ✅ Response Interceptor: Handle error 401 (unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired atau invalid
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
