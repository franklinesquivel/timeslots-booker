import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@web/lib/api';

export const useCancelBookingMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['cancel-booking'],
        mutationFn: (bookingId: string) => apiClient.post(`/bookings/${bookingId}/cancel`, {}),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['bookings'] });
        }
    });
};
