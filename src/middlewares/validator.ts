import { Request, Response, NextFunction } from "express";

/**
 * Middleware para validación de datos
 * Se puede extender con librerías como Joi o express-validator
 */

/**
 * Valida que los campos requeridos estén presentes en el body
 * @param requiredFields - Array de campos requeridos
 */
export const validateRequiredFields = (requiredFields: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const missingFields = requiredFields.filter(
            (field) => !req.body[field]
        );

        if (missingFields.length > 0) {
            res.status(400).json({
                success: false,
                message: `Campos requeridos faltantes: ${missingFields.join(
                    ", "
                )}`,
            });
            return;
        }

        next();
    };
};
