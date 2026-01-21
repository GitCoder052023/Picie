import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const statusCode = err.statusCode || 500;

    // Zod Validation Errors
    if (err instanceof ZodError) {
        logger.warn(`Validation Error: ${JSON.stringify(err.issues)}`);
        return res.status(400).json({
            success: false,
            error: "Validation Failed",
            details: err.issues.map((e: any) => ({ path: e.path.join('.'), message: e.message }))
        });
    }

    // Known App Errors (if we had custom classes, manageable here)

    // Default System Errors
    logger.error(`System Error: ${err.message}`, { stack: err.stack });

    res.status(statusCode).json({
        success: false,
        error: statusCode === 500 ? "Internal Server Error" : err.message
    });
}
