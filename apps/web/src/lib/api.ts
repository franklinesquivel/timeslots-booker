import { authStore } from '../stores/auth.store';

export class ApiError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = authStore.getState().token;

    const headers = new Headers(options.headers);
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    if (options.body) {
        headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
        ...options,
        headers
    });

    if (!response.ok) {
        const errorBody = await response.text();
        const errorMessage = errorBody || response.statusText;
        throw new ApiError(response.status, errorMessage);
    }

    if (response.status === 204 || response.headers.get('Content-Length') === '0') {
        return undefined as T;
    }

    return (await response.json()) as T;
}

export const apiClient = {
    get<T>(path: string): Promise<T> {
        return request<T>(path, { method: 'GET' });
    },
    post<T>(path: string, data: unknown): Promise<T> {
        return request<T>(path, { method: 'POST', body: JSON.stringify(data) });
    }
};
