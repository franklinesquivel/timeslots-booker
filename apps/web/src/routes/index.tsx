import { createFileRoute } from '@tanstack/react-router';
import { toast } from 'sonner';
import { BookingsTable } from '@web/components/bookings/BookingsTable.tsx';
import { CreateBookingDialog } from '@web/components/bookings/components/CreateBookingDialog.tsx';
import { Button } from '@web/components/ui/button.tsx';
import { UserNavBar } from '@web/components/users/UserNavBar.tsx';
import { useGetUserBookings } from '@web/hooks/useGetUserBookings.ts';
import { authStore } from '@web/stores/auth.store.ts';

export const Route = createFileRoute('/')({
    component: Index
});

function Index() {
    const { user } = authStore();
    const { data: bookings, isLoading: bookingsLoading } = useGetUserBookings();

    return (
        <div
            className={`
                h-full w-full bg-background p-5 shadow-2xl
                md:aspect-[3/2] md:h-auto md:w-4/6 md:rounded-2xl md:p-10
            `}
        >
            {user && <UserNavBar user={user} />}

            <hr className="my-5 h-px border-0 bg-accent" />

            <div className="flex items-center gap-4">
                <CreateBookingDialog />
            </div>

            {bookingsLoading && <p>Loading...</p>}

            {!bookingsLoading && (
                <div className="mt-10 max-h-4/5 overflow-y-scroll">
                    <BookingsTable bookings={bookings} />
                </div>
            )}
        </div>
    );
}
