import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';
import { ApiError, apiClient } from '@web/lib/api';
import type { CreateBookingPayload } from '@web/types/bookings';

const BookingErrorCode = {
    LOCAL_CONFLICT: 'BOOKING_LOCAL_CONFLICT',
    GOOGLE_CALENDAR_CONFLICT: 'BOOKING_GOOGLE_CONFLICT'
} as const;

const conflictErrorSchema = z.object({
    reason: z.string(),
    message: z.string(),
    code: z.enum([BookingErrorCode.LOCAL_CONFLICT, BookingErrorCode.GOOGLE_CALENDAR_CONFLICT])
});

interface MutationCallbacks {
    onSuccess?: () => void;
}

export const useCreateBookingMutation = ({ onSuccess }: MutationCallbacks = {}) => {
    const queryClient = useQueryClient();

    return useMutation<unknown, ApiError, CreateBookingPayload>({
        mutationFn: data => apiClient.post('/bookings', data),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['bookings'] });
            toast.success('Booking created successfully!');
            onSuccess?.();
        },
        onError: error => {
            if (error.status === 409) {
                const parsedError = conflictErrorSchema.safeParse(error.payload);

                if (!parsedError.success) {
                    toast.error('An unexpected conflict occurred.');
                    return;
                }

                const { code } = parsedError.data;

                if (code === BookingErrorCode.LOCAL_CONFLICT) {
                    toast.error('This time slot is no longer available. Please select a different time.');
                } else {
                    toast.error('This time slot conflicts with an event in your Google Calendar.');
                }
            } else {
                toast.error(error.message || 'An unexpected error occurred. Please try again.');
            }
        }
    });
};
