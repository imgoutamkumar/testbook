import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: "STUDENT" | "ADMIN" | "CONTENT_CREATOR" | "SUPERADMIN";
  isVerified: boolean;
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user?: User;
    action?: "VERIFY_ACCOUNT";
    email?: string;
  };
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "https://mocktest-backend-g9bi.onrender.com/api/v1",
    credentials: "include", // CRITICAL: sends and receives HttpOnly cookies
  }),
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, { name: string; email: string; password: string }>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyOtp: builder.mutation<{ success: boolean; message: string }, { email: string; otp: string }>({
      query: (body) => ({
        url: "/auth/verify-otp", // Ensure this matches your backend route
        method: "POST",
        body,
      }),
    }),
    resendOtp: builder.mutation<{ success: boolean; message: string }, { email: string; type: string }>({
      query: (body) => ({
        url: "/auth/resend-otp", // Ensure this matches your backend route
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    getUser: builder.query<{ success: boolean; data: User }, void>({
      query: () => ({
        url: "/user/me", // Change this to your actual backend profile route (e.g., "/profile")
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLogoutMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
} = authApi;