import { Request, Response, NextFunction } from "express";

/**
 * Middleware centralizado para manejo de errores
 */

interface CustomError extends Error {
    statusCode?: number;
}

const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error("Error:", err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Error interno del servidor";

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};

export default errorHandler;
