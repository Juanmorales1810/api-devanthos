/**
 * Helpers para respuestas estandarizadas
 */

/**
 * Respuesta exitosa
 */
const successResponse = (
    res,
    data = null,
    message = "Operación exitosa",
    statusCode = 200
) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

/**
 * Respuesta de error
 */
const errorResponse = (
    res,
    message = "Error en la operación",
    statusCode = 400
) => {
    return res.status(statusCode).json({
        success: false,
        message,
    });
};

/**
 * Respuesta de creación exitosa
 */
const createdResponse = (
    res,
    data,
    message = "Recurso creado exitosamente"
) => {
    return successResponse(res, data, message, 201);
};

/**
 * Respuesta de no encontrado
 */
const notFoundResponse = (res, message = "Recurso no encontrado") => {
    return errorResponse(res, message, 404);
};

module.exports = {
    successResponse,
    errorResponse,
    createdResponse,
    notFoundResponse,
};
