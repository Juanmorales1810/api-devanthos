import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Wrapper para manejar errores en funciones async
 * Evita tener que usar try-catch en cada controlador
 */
type AsyncRequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void | Response>;

const asyncHandler = (fn: AsyncRequestHandler): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export default asyncHandler;
