import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { User } from '../types/user';

interface AuthState {
    token: string | null;
    user: User | null;
    error: string | null;
    isAuthenticated: () => boolean;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    setError: (error: string) => void;
    clearError: () => void;
    logout: () => void;
}

export const authStore = create<AuthState>()(
    devtools(
        persist(
            (set, get) => ({
                token: null,
                user: null,
                error: null,
                isAuthenticated: () => !!get().token,
                setToken: token => set({ token }),
                setUser: user => set({ user }),
                setError: error => set({ error }),
                clearError: () => set({ error: null }),
                logout: () => set({ token: null, user: null, error: null })
            }),
            {
                name: 'auth-storage',
                partialize: ({ token }) => ({ token }) // only persist the token
            }
        )
    )
);
