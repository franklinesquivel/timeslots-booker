import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { TypedConfigService } from '../config/typed-config.service';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        configService: TypedConfigService,
        private readonly authService: AuthService
    ) {
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
            scope: [
                'email',
                'profile',
                'https://www.googleapis.com/auth/calendar.readonly',
                'https://www.googleapis.com/auth/calendar.freebusy'
            ]
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<void> {
        if (!profile.emails || !profile.name) {
            console.error('Invalid profile structure', { profile });

            throw new Error('Missing data on profile retrieve');
        }

        const user = await this.authService.validateUser({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: `${profile.name.givenName} ${profile.name.familyName}`,
            picture: profile.photos ? profile.photos[0].value : null,
            accessToken,
            refreshToken
        });

        done(null, user);
    }
}
