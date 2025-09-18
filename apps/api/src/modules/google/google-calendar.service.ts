import { calendar, calendar_v3 } from '@googleapis/calendar';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleToken } from '@prisma/client';
import { GaxiosError } from 'gaxios';
import { getMessageFromUnknownError } from '@api/common/utils';
import { GoogleAuthService } from './google-auth.service';

type UserCalendarIdObjType = { id: string };

@Injectable()
export class GoogleCalendarService {
    constructor(private readonly authService: GoogleAuthService) {}

    private getCalendarClient(userToken: GoogleToken): calendar_v3.Calendar {
        const authClient = this.authService.getOAuthClient(userToken);

        return calendar({ version: 'v3', auth: authClient });
    }

    private async handleApiError<T>(
        error: unknown,
        userToken: GoogleToken,
        apiCall: (refreshedToken: GoogleToken) => Promise<T>
    ): Promise<T> {
        if (error instanceof GaxiosError && error.response?.status === 401) {
            console.log('Access token expired, refreshing...');

            const refreshedToken = await this.authService.refreshAccessToken(userToken);
            return apiCall(refreshedToken);
        }

        console.error('An unexpected error occurred', { error: getMessageFromUnknownError(error) });
        throw error;
    }

    private async getUserCalendarsIds(userToken: GoogleToken): Promise<UserCalendarIdObjType[]> {
        const execute = async (currentToken: GoogleToken) => {
            const client = this.getCalendarClient(currentToken);
            const response = await client.calendarList.list();

            if (!response.data.items) return [];

            return response.data.items
                .map(({ id }) => ({ id }))
                .filter((item): item is UserCalendarIdObjType => !!item.id);
        };

        try {
            return await execute(userToken);
        } catch (error) {
            return this.handleApiError(error, userToken, refreshedToken => execute(refreshedToken));
        }
    }

    async checkUserCalendarsAvailabilityByTimeSlot(
        userToken: GoogleToken,
        startTime: string,
        endTime: string
    ): Promise<boolean> {
        const execute = async (currentToken: GoogleToken) => {
            const client = this.getCalendarClient(currentToken);
            const userCalendarsIds = await this.getUserCalendarsIds(userToken);

            const response = await client.freebusy.query({
                requestBody: {
                    timeMin: startTime,
                    timeMax: endTime,
                    items: userCalendarsIds
                }
            });

            if (!response.data.calendars)
                throw new InternalServerErrorException('Invalid calendar: No data in user calendars response');

            const busyInSomeCalendar = Object.entries(response.data.calendars).some(
                ([, c]) => c.busy && c.busy.length > 0
            );

            return !busyInSomeCalendar;
        };

        try {
            return await execute(userToken);
        } catch (error) {
            return this.handleApiError(error, userToken, refreshedToken => execute(refreshedToken));
        }
    }
}
