import { Global, Module } from '@nestjs/common';
import { TypedConfigService } from './typed-config.service';

/**
 * The `@Global()` decorator makes the `TypedConfigService` available across the entire
 * application. This allows any other module (e.g., `PrismaModule`) to inject the
 * `TypedConfigService` without needing to add `TypedConfigModule` to its own `imports`
 * array. This pattern is ideal for foundational, shared services like configuration.
 */
@Global()
@Module({
    providers: [TypedConfigService],
    exports: [TypedConfigService]
})
export class TypedConfigModule {}
