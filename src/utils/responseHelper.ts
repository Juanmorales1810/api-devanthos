import { Response } from "express";

/**
 * Helpers para respuestas estandarizadas
 */

interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
}

/**
 * Respuesta exitosa
 */
export const successResponse = <T = any>(
    res: Response,
    data: T | null = null,
    message: string = "Operación exitosa",
    statusCode: number = 200
): Response<ApiResponse<T>> => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

/**
 * Respuesta de error
 */
export const errorResponse = (
    res: Response,
    message: string = "Error en la operación",
    statusCode: number = 400
): Response<ApiResponse> => {
    return res.status(statusCode).json({
        success: false,
        message,
    });
};

/**
 * Respuesta de creación exitosa
 */
export const createdResponse = <T = any>(
    res: Response,
    data: T,
    message: string = "Recurso creado exitosamente"
): Response<ApiResponse<T>> => {
    return successResponse(res, data, message, 201);
};

/**
 * Respuesta de no encontrado
 */
export const notFoundResponse = (
    res: Response,
    message: string = "Recurso no encontrado"
): Response<ApiResponse> => {
    return errorResponse(res, message, 404);
};
