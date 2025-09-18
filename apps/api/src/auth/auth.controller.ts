import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { AuthenticatedRequest } from '../types/express';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth() {
        // The GoogleStrategy will redirect to the Google login page automatically.
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    googleAuthRedirect(@Req() req: AuthenticatedRequest) {
        return this.authService.login(req.user);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Req() req: AuthenticatedRequest) {
        return req.user;
    }
}
