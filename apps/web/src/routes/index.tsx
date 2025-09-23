import { createFileRoute } from '@tanstack/react-router';
import { PlusCircle } from 'react-feather';
import { Button } from '@web/components/ui/button.tsx';
import { UserNavBar } from '@web/components/users/UserNavBar.tsx';
import { authStore } from '@web/stores/auth.store.ts';

export const Route = createFileRoute('/')({
    component: Index
});

function Index() {
    const { user } = authStore();

    return (
        <div
            className={`
                h-full w-full bg-white p-5 shadow-2xl
                md:aspect-[3/2] md:h-auto md:w-4/6 md:rounded-2xl md:p-10
            `}
        >
            {user && <UserNavBar user={user} />}

            <hr className="my-5 h-px border-0 bg-accent" />

            <Button size="lg">
                <PlusCircle />
                New Booking
            </Button>
        </div>
    );
}
