import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodType) {}

    transform(value: unknown) {
        const result = this.schema.safeParse(value);

        if (result.success) return result.data;

        throw new BadRequestException('Invalid payload', {
            cause: { errors: result.error.issues }
        });
    }
}
