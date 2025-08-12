import { findUserByEmail } from "@/app/actions/userActions";
import { TUser } from "@/types/user";
import { create } from "zustand";

type UserState = {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  clearUser: () => void;
  syncUser: (email: string) => Promise<void>;
};

export const userStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  syncUser: async (email: string) => {
    try {
      const user = await findUserByEmail(email);
      if (user) {
        set({ user });
      }
    } catch (error) {
      console.error("Error syncing user:", error);
    }
  },
}));
