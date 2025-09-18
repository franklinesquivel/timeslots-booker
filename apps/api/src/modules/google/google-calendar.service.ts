import { auth, calendar, calendar_v3 } from '@googleapis/calendar';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleToken } from '@prisma/client';
import { GaxiosError } from 'gaxios';
import { OAuth2Client } from 'google-auth-library';
import { TypedConfigService } from '@api/config/typed-config.service';
import { PrismaService } from '@api/prisma/prisma.service';

type UserCalendarIdObjType = { id: string };

@Injectable()
export class GoogleCalendarService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: TypedConfigService
    ) {}

    private getOauthClient(): OAuth2Client {
        return new auth.OAuth2(
            this.configService.get('GOOGLE_CLIENT_ID'),
            this.configService.get('GOOGLE_CLIENT_SECRET')
        );
    }

    private getCalendarClient(userToken: GoogleToken): calendar_v3.Calendar {
        const authClient = this.getOauthClient();

        authClient.setCredentials({
            access_token: userToken.accessToken,
            refresh_token: userToken.refreshToken
        });

        return calendar({ version: 'v3', auth: authClient });
    }

    private async refreshAccessToken(token: GoogleToken): Promise<GoogleToken> {
        const authClient = this.getOauthClient();
        authClient.setCredentials({ refresh_token: token.refreshToken });

        try {
            const { token: newAccessToken } = await authClient.getAccessToken();

            if (!newAccessToken) {
                throw new InternalServerErrorException('Failed to refresh access token');
            }

            return this.prisma.googleToken.update({
                where: { id: token.id },
                data: { accessToken: newAccessToken }
            });
        } catch (error) {
            console.error('Error refreshing access token:', error);
            throw new InternalServerErrorException('Failed to refresh access token');
        }
    }

    private async handleApiError<T>(
        error: unknown,
        userToken: GoogleToken,
        apiCall: (refreshedToken: GoogleToken) => Promise<T>
    ): Promise<T> {
        if (error instanceof GaxiosError && error.response?.status === 401) {
            console.log('Access token expired, refreshing...');
            const refreshedToken = await this.refreshAccessToken(userToken);
            return apiCall(refreshedToken);
        }
        console.error('An unexpected error occurred:', error);
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

            if (!response.data.calendars) throw new InternalServerErrorException('Invalid calendar response');

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
