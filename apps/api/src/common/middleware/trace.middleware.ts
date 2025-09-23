import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { TraceService } from '../trace/trace.service';

@Injectable()
export class TraceMiddleware implements NestMiddleware {
    constructor(private readonly traceService: TraceService) {}

    use(req: Request, res: Response, next: NextFunction) {
        const traceId = req.get('x-trace-id') ?? randomUUID();

        this.traceService.setTraceId(traceId);
        res.setHeader('x-trace-id', traceId);

        next();
    }
}
