import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Button } from '@web/components/ui/button.tsx';

const RootLayout = () => (
    <>
        <div className="flex gap-2 p-2">
            <Link
                to="/"
                className="[&.active]:font-bold"
            >
                <Button>Home</Button>
            </Link>{' '}
            <Link
                to="/about"
                className="[&.active]:font-bold"
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
