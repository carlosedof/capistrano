import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useGeneralStore = create()(
  persist(
    (set, get) => ({
      fulldata: {
        songs: [],
        agenda: [],
        videos: [],
      },
      setFulldata: async (data) => {
        set({
          fulldata: {
            songs: data.songs || [],
            agenda: data.agenda || [],
            videos: data.videos || [],
          },
        });
      },
    }),
    {
      name: "general-storage",
    }
  )
);
