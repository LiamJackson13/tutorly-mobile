import AsyncStorage from "@react-native-async-storage/async-storage";
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

// Define user type
type User = {
    id: string;
    email: string;
    role: "student" | "tutor" | "parent";
    name: string | "User";
    phone?: string;
};

// Define the store interface
type AuthStore = {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: (user: User) => set({user, isAuthenticated: true}),
            logout: () => set({user: null, isAuthenticated: false}),
        }),
        {
            name: "auth-storage", // Name for the storage key
            storage: createJSONStorage(() => AsyncStorage), // Use phone storage
        }
    )
);