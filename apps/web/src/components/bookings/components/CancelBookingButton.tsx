import { UserX } from 'react-feather';
import { ConfirmDialogContent } from '@web/components/ui/ConfirmDialogContent.tsx';
import { AlertDialog, AlertDialogTrigger } from '@web/components/ui/alert-dialog';
import { Button } from '@web/components/ui/button.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@web/components/ui/tooltip.tsx';
import { useCancelBookingMutation } from '@web/hooks/useCancelBookingMutation.ts';
import type { Booking } from '@web/types/bookings.ts';

interface Props {
    readonly booking: Booking;
}

export const CancelBookingButton = ({ booking }: Props) => {
    const { mutate: cancelBooking, isPending } = useCancelBookingMutation();

    return (
        <AlertDialog>
            <Tooltip disableHoverableContent>
                <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                        <Button
                            disabled={booking.status !== 'ACTIVE'}
                            variant="destructive"
                        >
                            <UserX />
                        </Button>
                    </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Cancel booking</TooltipContent>
            </Tooltip>
            <ConfirmDialogContent
                description="This action cannot be undone. This will permanently cancel your booking."
                isPending={isPending}
                title="Are you absolutely sure?"
                onConfirm={() => {
                    cancelBooking(booking.id);
                }}
            />
        </AlertDialog>
    );
};
