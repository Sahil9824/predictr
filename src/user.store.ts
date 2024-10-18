import { create } from "zustand";

interface USER {
  isAuthenticated: boolean;
  userAvatar: null;
  setIsAuthenticated: (data: any) => void;
  setUserAvatar: (data: any) => void;
}

const userStore = create<USER>((set) => ({
  isAuthenticated: false,
  userAvatar: null,
  setIsAuthenticated: (data: any) => set({ isAuthenticated: data }),
  setUserAvatar: (data: any) => set({ userAvatar: data }),
}));

export default userStore;
