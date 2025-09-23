import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ApiError, apiClient } from '@web/lib/api';

export const useCancelBookingMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<unknown, ApiError, string>({
        mutationKey: ['cancel-booking'],
        mutationFn: (bookingId: string) => apiClient.post(`/bookings/${bookingId}/cancel`, {}),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['bookings'] });
            toast.success('Booking cancelled successfully!');
        },
        onError: error => {
            toast.error(error.message || 'Failed to cancel booking. Please try again.');
        }
    });
};
