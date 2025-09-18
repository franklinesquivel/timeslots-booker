import { auth } from '@googleapis/calendar';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleToken } from '@prisma/client';
import { GaxiosError } from 'gaxios';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { getMessageFromUnknownError } from '@api/common/utils';
import { TypedConfigService } from '@api/config/typed-config.service';
import { PrismaService } from '@api/prisma/prisma.service';

@Injectable()
export class GoogleAuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: TypedConfigService
    ) {}

    getOAuthClient(userToken: GoogleToken, isRefreshAction = false): OAuth2Client {
        const client = new auth.OAuth2(
            this.configService.get('GOOGLE_CLIENT_ID'),
            this.configService.get('GOOGLE_CLIENT_SECRET')
        );

        const credentials: Credentials = {
            refresh_token: userToken.refreshToken
        };

        if (!isRefreshAction) {
            credentials.access_token = userToken.accessToken;
        }

        client.setCredentials(credentials);

        return client;
    }

    async retryApiOperationAfterTokenRefresh<T>(
        error: unknown,
        userToken: GoogleToken,
        apiCall: (refreshedToken: GoogleToken) => Promise<T>
    ): Promise<T> {
        if (error instanceof GaxiosError && error.response?.status === 401) {
            console.log('Access token expired, refreshing...');

            const refreshedToken = await this.refreshAccessToken(userToken);
            return apiCall(refreshedToken);
        }

        console.error('An unexpected error occurred', { error: getMessageFromUnknownError(error) });
        throw error;
    }

    async refreshAccessToken(userToken: GoogleToken): Promise<GoogleToken> {
        const authClient = this.getOAuthClient(userToken, true);

        try {
            const { token: newAccessToken, res } = await authClient.getAccessToken();

            if (!newAccessToken) {
                console.error('Error refreshing access token', { response: res?.json() });
                throw new InternalServerErrorException('Failed to refresh access token: invalid response body');
            }

            return this.prisma.googleToken.update({
                where: { id: userToken.id },
                data: { accessToken: newAccessToken }
            });
        } catch (error: unknown) {
            const errMsg = getMessageFromUnknownError(error);

            console.error('Error refreshing access token', { error: errMsg });
            throw new InternalServerErrorException(`Failed to refresh Google Access Token: ${errMsg}`);
        }
    }

    async getUserScopes(userToken: GoogleToken): Promise<string[]> {
        const authClient = this.getOAuthClient(userToken);

        try {
            const { scopes } = await authClient.getTokenInfo(userToken.accessToken);
            return scopes;
        } catch (error: unknown) {
            const errMsg = getMessageFromUnknownError(error);

            console.error('Error trying to get access token info', { error: errMsg });
            throw new InternalServerErrorException(`Error trying to get access token info: ${errMsg}`);
        }
    }
}
