import { create } from "zustand";

interface USER {
  isAuthenticated: boolean;
  setIsAuthenticated: (data: any) => void;
}

const userStore = create<USER>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (data: any) => set({ isAuthenticated: data }),
}));

export default userStore;
