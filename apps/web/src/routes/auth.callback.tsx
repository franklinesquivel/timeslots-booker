import { createFileRoute, redirect } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';
import { authStore } from '../stores/auth.store';

const authCallbackSearchSchema = z.object({
    token: z.string().optional() // It should be required but for router behavior purposes we have to skip the required validation
});

export const Route = createFileRoute('/auth/callback')({
    component: AuthCallbackComponent,
    validateSearch: zodValidator(authCallbackSearchSchema),
    beforeLoad: ({ search }) => {
        if (search.token) {
            authStore.getState().setToken(search.token);
            throw redirect({ to: '/' });
        } else {
            authStore.getState().setError('Authentication failed. Please try again.');
            throw redirect({ to: '/login' });
        }
    }
});

function AuthCallbackComponent() {
    return <div>Loading...</div>;
}
