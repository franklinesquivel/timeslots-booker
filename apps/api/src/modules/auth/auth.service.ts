import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { User } from '@prisma/client';
import { PrismaService } from '@api/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(details: {
        googleId: string;
        email: string;
        name: string;
        picture: string | null;
        accessToken: string;
        refreshToken: string;
    }): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { googleId: details.googleId }
        });

        /**
         * Google Access Tokens expires in 1h.
         * @see https://cloud.google.com/docs/authentication/token-types#access-tokens
         */
        const expiryDate = new Date(Date.now() + 3600 * 1000);

        const googleToken = {
            accessToken: details.accessToken,
            refreshToken: details.refreshToken,
            expiryDate
        };

        if (user) {
            return this.prisma.user.update({
                where: { id: user.id },
                data: {
                    googleToken: {
                        upsert: {
                            create: googleToken,
                            update: googleToken
                        }
                    }
                }
            });
        }

        return this.prisma.user.create({
            data: {
                googleId: details.googleId,
                email: details.email,
                name: details.name,
                picture: details.picture,
                googleToken: {
                    create: googleToken
                }
            }
        });
    }

    login(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload)
        };
    }
}
