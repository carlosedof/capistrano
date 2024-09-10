import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      authenticated: undefined,
      token: undefined,
      setMe: async (account) => {
        set({
          authenticated: true,
          account,
        });
      },
      login: async (credentials) => {
        try {
          set({
            isLoading: true,
          });
          const response = await fetch("/api/auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });
          if (response.ok) {
            set({
              authenticated: true,
              isLoading: false,
            });
            return response;
          } else {
            throw new Error("Failed to login");
          }
        } catch (error) {
          console.error("Error:", error);
          set({
            isLoading: false,
          });
          return error;
        }
      },
      logout: async () => {
        set({
          isLoading: true,
        });
        set({
          authenticated: false,
          account: undefined,
          token: undefined,
          isLoading: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
