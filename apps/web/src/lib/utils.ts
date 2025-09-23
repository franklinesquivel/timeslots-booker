import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatIsoDate = (date: string) => dayjs(date).format('YYYY-MM-DD hh:mm:ss A');
