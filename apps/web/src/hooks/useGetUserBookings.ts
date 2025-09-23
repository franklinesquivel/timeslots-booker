import { useQuery } from '@tanstack/react-query';
import { ApiError, apiClient } from '@web/lib/api.ts';
import { authStore } from '@web/stores/auth.store.ts';
import type { Booking } from '@web/types/bookings.ts';

export const useGetUserBookings = () => {
    const { token } = authStore();

    const {
        data = [],
        isFetching,
        isLoading
    } = useQuery<Booking[], ApiError>({
        queryKey: ['bookings'],
        enabled: !!token,
        queryFn: () => apiClient.get('/bookings')
    });

    return { data, isLoading: isLoading || isFetching };
};
