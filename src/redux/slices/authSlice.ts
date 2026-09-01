import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../services/authApi";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: string | null;
}

// 1. Check localStorage on initial load so user stays logged in after page refresh!
const savedRole = localStorage.getItem("role");
const savedUserId = localStorage.getItem("userId");

const initialState: AuthState = {
  user: null,
  isAuthenticated: !!savedRole, // If a role exists in local storage, they are logged in
  role: savedRole,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.role = action.payload.role;

      // 2. Automatically sync to localStorage whenever Redux is updated
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("userId", action.payload.id || "");
    },

    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.role = null;

      // 3. 🚨 CRITICAL: Clear localStorage on logout!
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
    },
  },
});

export const { setCredentials, logoutUser } = authSlice.actions;
export default authSlice.reducer;