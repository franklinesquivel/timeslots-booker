import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
    constructor(private prisma: PrismaService) {}

    getHello(): string {
        return 'Hello World!';
    }

    getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }
}
