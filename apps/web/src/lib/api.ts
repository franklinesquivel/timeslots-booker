import { authStore } from '../stores/auth.store';

export class ApiError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export const apiClient = {
    async get<T>(path: string): Promise<T> {
        const token = authStore.getState().token;

        const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
            headers: {
                ...(token && { Authorization: `Bearer ${token}` })
            }
        });

        if (!response.ok) {
            throw new ApiError(response.status, response.statusText);
        }

        return (await response.json()) as T;
    }
};
