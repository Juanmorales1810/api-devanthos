/**
 * Especificación OpenAPI para la API de Devanthos
 */

export const openApiSpec = {
    openapi: "3.1.0",
    info: {
        title: "API Devanthos",
        version: "1.0.0",
        description:
            "API Backend desarrollada con Node.js, Express y TypeScript",
        contact: {
            name: "Devanthos Team",
            email: "contact@devanthos.com",
        },
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Servidor de desarrollo",
        },
        {
            url: "https://api.devanthos.com",
            description: "Servidor de producción",
        },
    ],
    tags: [
        {
            name: "Health",
            description: "Endpoints de salud del sistema",
        },
        {
            name: "General",
            description: "Endpoints generales de la API",
        },
    ],
    paths: {
        "/health": {
            get: {
                tags: ["Health"],
                summary: "Health check del servidor",
                description:
                    "Verifica que el servidor esté funcionando correctamente",
                responses: {
                    "200": {
                        description: "Servidor funcionando correctamente",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            example: "OK",
                                        },
                                        timestamp: {
                                            type: "string",
                                            format: "date-time",
                                            example: "2025-12-06T10:00:00.000Z",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api": {
            get: {
                tags: ["General"],
                summary: "Información de la API",
                description: "Retorna información general sobre la API",
                responses: {
                    "200": {
                        description: "Información de la API",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true,
                                        },
                                        message: {
                                            type: "string",
                                            example:
                                                "Bienvenido a la API de Devanthos",
                                        },
                                        version: {
                                            type: "string",
                                            example: "1.0.0",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            Error: {
                type: "object",
                properties: {
                    success: {
                        type: "boolean",
                        example: false,
                    },
                    message: {
                        type: "string",
                        example: "Error en la operación",
                    },
                },
            },
            SuccessResponse: {
                type: "object",
                properties: {
                    success: {
                        type: "boolean",
                        example: true,
                    },
                    message: {
                        type: "string",
                        example: "Operación exitosa",
                    },
                    data: {
                        type: "object",
                    },
                },
            },
        },
    },
};
