/**
 * Configuración centralizada de la aplicación
 */
const config = {
    // Servidor
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || "development",

    // Base de datos
    db: {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        name: process.env.DB_NAME || "devanthos",
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "",
    },

    // JWT
    jwt: {
        secret: process.env.JWT_SECRET || "default_secret_key",
        expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    },
};

module.exports = config;
