import { calendar, calendar_v3 } from '@googleapis/calendar';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleToken, User } from '@prisma/client';
import { PrismaService } from '@api/prisma/prisma.service';
import { GoogleAuthService } from './google-auth.service';

type UserCalendarIdObjType = { id: string };

@Injectable()
export class GoogleCalendarService {
    constructor(
        private readonly authService: GoogleAuthService,
        private readonly prisma: PrismaService
    ) {}

    private getCalendarClient(userToken: GoogleToken): calendar_v3.Calendar {
        const authClient = this.authService.getOAuthClient(userToken);

        return calendar({ version: 'v3', auth: authClient });
    }

    private async getUserGoogleToken(userId: string): Promise<GoogleToken> {
        const googleToken = await this.prisma.googleToken.findUnique({
            where: { userId }
        });

        if (!googleToken) {
            throw new ConflictException("The current user doesn't have an associated Google Access Token");
        }

        return googleToken;
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
            return this.authService.retryApiOperationAfterTokenRefresh(error, userToken, refreshedToken =>
                execute(refreshedToken)
            );
        }
    }

    async checkUserCalendarsAvailabilityByTimeSlot(user: User, startTime: string, endTime: string): Promise<boolean> {
        const googleToken = await this.getUserGoogleToken(user.id);

        const execute = async (currentToken: GoogleToken) => {
            const client = this.getCalendarClient(currentToken);
            const userCalendarsIds = await this.getUserCalendarsIds(currentToken);

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
            return await execute(googleToken);
        } catch (error) {
            return this.authService.retryApiOperationAfterTokenRefresh(error, googleToken, refreshedToken =>
                execute(refreshedToken)
            );
        }
    }
}
