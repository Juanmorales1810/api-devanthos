/**
 * Configuración centralizada de la aplicación
 */

interface DatabaseConfig {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
}

interface JWTConfig {
    secret: string;
    expiresIn: string;
}

interface Config {
    port: number;
    nodeEnv: string;
    db: DatabaseConfig;
    jwt: JWTConfig;
}

const config: Config = {
    // Servidor
    port: parseInt(process.env.PORT || "3000", 10),
    nodeEnv: process.env.NODE_ENV || "development",

    // Base de datos
    db: {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "5432", 10),
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

export default config;
