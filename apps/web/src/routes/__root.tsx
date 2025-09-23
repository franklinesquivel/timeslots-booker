import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRoute, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { authStore } from '@web/stores/auth.store.ts';
import type { AppRoutes } from '@web/types/routes.ts';

const RootLayout = () => {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <Outlet />

            <TanStackRouterDevtools />
            <ReactQueryDevtools />
        </div>
    );
};

export const Route = createRootRoute({
    component: RootLayout,
    beforeLoad: ({ location }) => {
        const { isAuthenticated } = authStore.getState();
        const publicRoutes: AppRoutes[] = ['/', '/auth/callback'];

        if (!isAuthenticated() && !(publicRoutes as string[]).includes(location.pathname)) {
            throw redirect({ to: '/' });
        }
    }
});
