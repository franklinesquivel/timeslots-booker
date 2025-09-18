import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { User } from '@prisma/client';
import { GoogleAuthGuard } from '@api/auth/google-auth.guard';
import type { AuthenticatedRequest } from '@api/types/express';

@Controller('auth')
export class AuthController {
    @Get()
    @UseGuards(GoogleAuthGuard)
    async googleAuth() {
        // The GoogleStrategy will redirect to the Google login page automatically.
    }

    @Get('callback')
    @UseGuards(GoogleAuthGuard)
    googleAuthRedirect(@Req() req: AuthenticatedRequest): User {
        return req.user;
    }
}
