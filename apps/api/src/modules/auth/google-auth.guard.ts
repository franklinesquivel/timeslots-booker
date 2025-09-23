import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
    /**
     * This method is the designated hook for passing custom options to the Passport strategy.
     * The options returned from this method will be merged with the default options
     * and passed to the `passport.authenticate()` function.
     */
    override getAuthenticateOptions() {
        return {
            accessType: 'offline',
            prompt: 'consent'
        };
    }
}
