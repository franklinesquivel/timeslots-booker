import { ConflictException } from '@nestjs/common';

export enum BookingErrorCode {
    LOCAL_CONFLICT = 'BOOKING_LOCAL_CONFLICT',
    GOOGLE_CALENDAR_CONFLICT = 'BOOKING_GOOGLE_CONFLICT'
}

/**
 * Thrown when a requested time slot conflicts with an existing bookings in the local database.
 */
export class LocalBookingConflictException extends ConflictException {
    constructor(message = 'This time slot is no longer available.') {
        super({
            reason: 'Conflict with existing booking',
            message,
            errorCode: BookingErrorCode.LOCAL_CONFLICT
        });
    }
}

/**
 * Thrown when a requested time slot conflicts with an event in the user's Google Calendar.
 */
export class GoogleCalendarConflictException extends ConflictException {
    constructor(message = 'This time slot conflicts with an event in your Google Calendar.') {
        super({
            reason: 'Conflict with Google Calendar',
            message,
            errorCode: BookingErrorCode.GOOGLE_CALENDAR_CONFLICT
        });
    }
}
