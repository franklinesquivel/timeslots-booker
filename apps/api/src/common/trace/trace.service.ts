import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class TraceService {
    private traceId: string;

    setTraceId(traceId: string) {
        this.traceId = traceId;
    }

    getTraceId() {
        return this.traceId;
    }
}
