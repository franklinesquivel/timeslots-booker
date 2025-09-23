import { authStore } from '../stores/auth.store';

export class ApiError extends Error {
    status: number;
    payload: unknown;

    constructor(status: number, message: string, payload: unknown = null) {
        super(message);
        this.status = status;
        this.payload = payload;
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
        let errorPayload: unknown = null;
        try {
            errorPayload = JSON.parse(errorBody);
        } catch (_e) {
            // The body was not JSON
        }

        const parsedPayload = errorPayload as { message?: string };

        const errorMessage = parsedPayload.message ?? errorBody;
        throw new ApiError(response.status, errorMessage, errorPayload);
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
