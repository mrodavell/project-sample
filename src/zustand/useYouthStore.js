import { create } from "zustand";

export const useYouthStore = create((set) => ({
  youths: [],
  status: "Processing...",
  isLoading: false,
  error: null,
  setYouths: async (youths) => {
    set({ isLoading: true });
    set({ youths: youths });
    set({ isLoading: false });
  },
}));
