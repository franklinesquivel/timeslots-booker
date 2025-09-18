import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { User } from '@prisma/client';
import { googleCalendarScopes } from '@api/common/constants/google-calendar-scopes';
import { GoogleAuthService } from '@api/modules/google/google-auth.service';
import { PrismaService } from '@api/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly googleAuthService: GoogleAuthService,
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ) {}

    async validateUser(details: {
        googleId: string;
        email: string;
        name: string;
        picture: string | null;
        accessToken: string;
        refreshToken: string;
    }): Promise<User> {
        const user = await this.prisma.user.upsert({
            where: { googleId: details.googleId },
            update: {},
            create: {
                googleId: details.googleId,
                email: details.email,
                name: details.name,
                picture: details.picture
            }
        });

        /**
         * Google Access Tokens expires in 1h.
         * @see https://cloud.google.com/docs/authentication/token-types#access-tokens
         */
        const expiryDate = new Date(Date.now() + 3600 * 1000);

        const googleTokenData = {
            accessToken: details.accessToken,
            refreshToken: details.refreshToken,
            expiryDate,
            userId: user.id
        };

        const googleToken = await this.prisma.googleToken.upsert({
            where: { userId: user.id },
            create: googleTokenData,
            update: googleTokenData
        });

        const tokenScopes = await this.googleAuthService.getUserScopes(googleToken);

        const calendarScopesAreEnabled = googleCalendarScopes.every(requiredScope =>
            tokenScopes.includes(requiredScope)
        );

        /**
         * If the required scopes are not enabled (not present in the access token data) AND the current user data
         * has `false` in the calendar_access_flag column, we don't need to do anything
         */
        if (!calendarScopesAreEnabled && !user.allowedGoogleCalendarAccess) return user;

        /**
         * Synchronizes the user's access flag with the token's scopes.
         * This ensures the `allowedGoogleCalendarAccess` flag in the database
         * accurately reflects the permissions granted by the user.
         */
        return await this.prisma.user.update({
            where: { id: user.id },
            data: { allowedGoogleCalendarAccess: calendarScopesAreEnabled }
        });
    }

    login(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload)
        };
    }
}
