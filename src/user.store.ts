import { create } from "zustand";

interface USER {
  isAuthenticated: boolean;
  isOnboarded: boolean;
  userAvatar: null;
  setIsAuthenticated: (data: any) => void;
  setUserAvatar: (data: any) => void;
  setIsOnboarded: (data: any) => void;
}

const userStore = create<USER>((set) => ({
  isAuthenticated: false,
  isOnboarded: false,
  userAvatar: null,
  setIsAuthenticated: (data: any) => set({ isAuthenticated: data }),
  setIsOnboarded: (data: any) => set({ isOnboarded: data }),
  setUserAvatar: (data: any) => set({ userAvatar: data }),
}));

export default userStore;
