import { createFileRoute, redirect } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';
import { authStore } from '../stores/auth.store';

const authCallbackSearchSchema = z.object({
    token: z.string()
});

export const Route = createFileRoute('/auth/callback')({
    component: AuthCallbackComponent,
    validateSearch: zodValidator(authCallbackSearchSchema),
    beforeLoad: ({ search }) => {
        if (search.token) {
            authStore.getState().setToken(search.token);

            //eslint-disable-next-line @typescript-eslint/only-throw-error -- TanStack Router uses this pattern for redirects
            throw redirect({ to: '/' });
        }
    }
});

function AuthCallbackComponent() {
    return <div>Loading...</div>;
}
