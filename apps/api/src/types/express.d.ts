import { User as PrismaUser } from '@prisma/client';
import { Request } from 'express';

// This is the new, specific type for authenticated requests
export interface AuthenticatedRequest extends Request {
    user: PrismaUser;
}

// Augment the 'express-serve-static-core' module, which is where the core Request type is defined.
declare module 'express-serve-static-core' {
    // Re-open the Request interface and add the 'user' property.
    interface Request {
        // The user property is optional as it's only present on authenticated routes.
        user: PrismaUser;
    }
}
