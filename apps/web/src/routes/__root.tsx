import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {Button} from "@web/components/ui/button.tsx";

const RootLayout = () => (
    <>
        <div className="p-2 flex gap-2">
            <Link to="/" className="[&.active]:font-bold">
                <Button>Home</Button>
            </Link>{' '}
            <Link to="/about" className="[&.active]:font-bold">
                <Button>About</Button>
            </Link>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
    </>
)

export const Route = createRootRoute({ component: RootLayout })
