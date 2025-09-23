import { UserX } from 'react-feather';
import { Button } from '@web/components/ui/button.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@web/components/ui/table.tsx';
import { cn, formatIsoDate } from '@web/lib/utils.ts';
import type { Booking } from '@web/types/bookings.ts';

interface Props {
    readonly bookings: Booking[];
}

export const BookingsTable = ({ bookings }: Props) => {
    const handleBookingCancel = (bookingId: string) => {
        console.log(`Cancelling booking ${bookingId}`);
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-left">Name</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {bookings.map(booking => (
                    <TableRow key={booking.id}>
                        <TableCell className="w-1/3 text-left">{booking.name}</TableCell>
                        <TableCell>{formatIsoDate(booking.startDateTime)}</TableCell>
                        <TableCell>{formatIsoDate(booking.endDateTime)}</TableCell>

                        <TableCell
                            className={cn(
                                `font-bold`,
                                booking.status === 'ACTIVE' ? 'text-primary' : 'text-destructive'
                            )}
                        >
                            {booking.status}
                        </TableCell>

                        <TableCell>
                            <Button
                                disabled={booking.status !== 'ACTIVE'}
                                title="Cancel booking"
                                variant="destructive"
                                onClick={() => {
                                    handleBookingCancel(booking.id);
                                }}
                            >
                                <UserX />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
