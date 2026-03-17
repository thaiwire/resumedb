import { IUser } from "@/interfaces";
import { create } from "zustand";

export interface UserState {
    setUser: (payload: IUser | null) => void;
    setUserLoading: (payload: boolean) => void;
    user: IUser | null;
    isUserLoading: boolean;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isUserLoading: true,
    setUser: (payload) => set({ user: payload }),
    setUserLoading: (payload) => set({ isUserLoading: payload }),
}));