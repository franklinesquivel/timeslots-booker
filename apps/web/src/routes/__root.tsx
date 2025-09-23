import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Link, Outlet, createRootRoute, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { LoginButton } from '@web/components/auth/LoginButton.tsx';
import { Button } from '@web/components/ui/button.tsx';
import { UserCard } from '@web/components/users/UserCard.tsx';
import { useGetUserProfile } from '@web/hooks/useGetUserProfile.ts';
import { authStore } from '@web/stores/auth.store.ts';
import type { AppRoutes } from '@web/types/routes.ts';

const RootLayout = () => {
    const { logout, user } = authStore();

    const { isLoading } = useGetUserProfile();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container m-auto mt-5">
            <div className="flex items-center justify-between gap-2 p-2">
                <div className="flex gap-2">
                    <Link
                        className="[&.active]:font-bold"
                        to="/"
                    >
                        <Button>Home</Button>
                    </Link>{' '}
                    <Link
                        className="[&.active]:font-bold"
                        to="/about"
                    >
                        <Button>About</Button>
                    </Link>
                </div>

                {user ? (
                    <>
                        <UserCard user={user} />

                        <Button onClick={logout}>Logout</Button>
                    </>
                ) : (
                    <LoginButton />
                )}
            </div>

            <hr />

            <div className="mt-5">
                <Outlet />
            </div>

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
