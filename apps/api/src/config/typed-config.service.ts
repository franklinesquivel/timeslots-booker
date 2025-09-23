import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from '@api/config/schema';

@Injectable()
export class TypedConfigService {
    constructor(private readonly configService: ConfigService<Config, true>) {}

    /**
     * Retrieves a configuration value with full type safety.
     * @param key The key of the configuration property to retrieve.
     * @returns The value of the configuration property.
     */
    get<K extends keyof Config>(key: K): Config[K] {
        return this.configService.get(key, { infer: true });
    }
}
