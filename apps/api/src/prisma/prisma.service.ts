import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TypedConfigService } from '@api/config/typed-config.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(private readonly config: TypedConfigService) {
        const enableDebugLogging = config.get('ENABLE_DATABASE_DEBUG_LOGGING');

        super({
            log: enableDebugLogging ? ['query', 'info', 'warn', 'error'] : ['warn', 'error']
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
