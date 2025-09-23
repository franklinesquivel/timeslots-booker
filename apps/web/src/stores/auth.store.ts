import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { User } from '../types/user';

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: () => boolean;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    logout: () => void;
}

export const authStore = create<AuthState>()(
    devtools(
        persist(
            (set, get) => ({
                token: null,
                user: null,
                isAuthenticated: () => !!get().token,
                setToken: token => set({ token }),
                setUser: user => set({ user }),
                logout: () => set({ token: null, user: null })
            }),
            {
                name: 'auth-storage',
                partialize: s => s.token
            }
        )
    )
);
