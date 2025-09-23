import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ApiError, apiClient } from '../lib/api';
import { authStore } from '../stores/auth.store';
import type { User } from '../types/user';

export const useGetUserProfile = () => {
    const { token, setUser, logout } = authStore();

    const { data, isFetching, isLoading, ...rest } = useQuery<User, ApiError>({
        queryKey: ['user-profile'],
        queryFn: () => apiClient.get('/auth/profile'),
        enabled: !!token,
        retry: (failureCount, error) => {
            if (error.status === 401) {
                return false;
            }

            return failureCount < 3;
        }
    });

    useEffect(() => {
        if (rest.isError && rest.error.status === 401) {
            logout();
        }
    }, [rest.isError, rest.error, logout]);

    useEffect(() => {
        if (data) {
            setUser(data);
        }
    }, [data, setUser]);

    return { isLoading: isLoading || isFetching };
};
