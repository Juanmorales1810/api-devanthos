/**
 * Middleware para validación de datos
 * Se puede extender con librerías como Joi o express-validator
 */

/**
 * Valida que los campos requeridos estén presentes en el body
 * @param {string[]} requiredFields - Array de campos requeridos
 */
const validateRequiredFields = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = requiredFields.filter(
            (field) => !req.body[field]
        );

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Campos requeridos faltantes: ${missingFields.join(
                    ", "
                )}`,
            });
        }

        next();
    };
};

module.exports = {
    validateRequiredFields,
};
