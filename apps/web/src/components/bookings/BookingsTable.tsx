import { Table, TableBody, TableCell, TableRow } from '@web/components/ui/table.tsx';
import { cn, formatIsoDate } from '@web/lib/utils.ts';
import type { Booking } from '@web/types/bookings.ts';
import { BookingsTableHeaders } from './components/BookingsTableHeaders.tsx';
import { CancelBookingButton } from './components/CancelBookingButton.tsx';

interface Props {
    readonly bookings: Booking[];
}

export const BookingsTable = ({ bookings }: Props) => {
    return (
        <Table>
            <BookingsTableHeaders />

            <TableBody>
                {bookings.map(booking => (
                    <TableRow key={booking.id}>
                        <TableCell className="max-w-1/3 overflow-x-hidden text-left">{booking.name}</TableCell>
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
                            <CancelBookingButton booking={booking} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
