export interface Booking {
    id: string;
    name: string;
    startDateTime: string;
    endDateTime: string;
    status: 'ACTIVE' | 'CANCELLED';
}
