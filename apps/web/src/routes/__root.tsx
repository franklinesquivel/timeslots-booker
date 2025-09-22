import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Button } from '@web/components/ui/button.tsx';

const RootLayout = () => (
    <>
        <div className="flex gap-2 p-2">
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

        <hr />

        <Outlet />

        <TanStackRouterDevtools />
    </>
);

export const Route = createRootRoute({ component: RootLayout });
