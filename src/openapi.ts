/**
 * Especificación OpenAPI para la API de Devanthos
 *
 * TIP: Para agregar nuevos endpoints, simplemente agrégalos en paths.
 * Los schemas reutilizables van en components.schemas
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
        {
            name: "Budget",
            description: "Endpoints para generar presupuestos en PDF",
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
        "/api/budget/generate": {
            post: {
                tags: ["Budget"],
                summary: "Generar y descargar presupuesto en PDF",
                description:
                    "Genera un PDF con el presupuesto y lo descarga directamente",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/BudgetRequest",
                            },
                            example: {
                                clientInfo: {
                                    name: "Juan Pérez",
                                    email: "juan@example.com",
                                    company: "Mi Empresa",
                                    description: "Necesito una landing page",
                                },
                                pageType: {
                                    id: "landing",
                                    name: "Landing Page",
                                    description:
                                        "Página de aterrizaje optimizada",
                                    basePrice: 250,
                                    estimatedDays: 7,
                                    features: [
                                        {
                                            name: "Diseño responsive",
                                            description: "Adaptación perfecta",
                                            details: ["Optimización móvil"],
                                        },
                                    ],
                                },
                                additionalFeatures: [
                                    {
                                        id: "seo",
                                        name: "SEO Avanzado",
                                        price: 100,
                                        description: "Optimización completa",
                                        benefits: ["Mejor posicionamiento"],
                                    },
                                ],
                                timeline: "normal",
                                estimatedDays: 7,
                                deliveryDate: "13 de diciembre de 2025",
                                totalPrice: 350,
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "PDF generado y listo para descarga",
                        content: {
                            "application/pdf": {
                                schema: {
                                    type: "string",
                                    format: "binary",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Datos inválidos",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Error" },
                            },
                        },
                    },
                    "500": {
                        description: "Error del servidor",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Error" },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            ClientInfo: {
                type: "object",
                required: ["name", "email"],
                properties: {
                    name: {
                        type: "string",
                        example: "Juan Pérez",
                        description: "Nombre completo del cliente",
                    },
                    email: {
                        type: "string",
                        format: "email",
                        example: "juan@example.com",
                    },
                    company: { type: "string", example: "Mi Empresa" },
                    description: {
                        type: "string",
                        example: "Descripción del proyecto",
                    },
                },
            },
            PageFeature: {
                type: "object",
                properties: {
                    name: { type: "string", example: "Diseño responsive" },
                    description: {
                        type: "string",
                        example: "Adaptación perfecta",
                    },
                    details: {
                        type: "array",
                        items: { type: "string" },
                        example: ["Optimización móvil"],
                    },
                },
            },
            SelectedPageType: {
                type: "object",
                required: [
                    "id",
                    "name",
                    "description",
                    "basePrice",
                    "estimatedDays",
                    "features",
                ],
                properties: {
                    id: { type: "string", example: "landing" },
                    name: { type: "string", example: "Landing Page" },
                    description: {
                        type: "string",
                        example: "Página optimizada",
                    },
                    basePrice: {
                        type: "number",
                        example: 250,
                        description: "Precio base en USD",
                    },
                    estimatedDays: { type: "number", example: 7 },
                    features: {
                        type: "array",
                        items: { $ref: "#/components/schemas/PageFeature" },
                    },
                },
            },
            AdditionalFeature: {
                type: "object",
                properties: {
                    id: { type: "string", example: "seo" },
                    name: { type: "string", example: "SEO Avanzado" },
                    price: { type: "number", example: 100 },
                    description: {
                        type: "string",
                        example: "Optimización completa",
                    },
                    benefits: {
                        type: "array",
                        items: { type: "string" },
                        example: ["Mejor posicionamiento"],
                    },
                },
            },
            BudgetRequest: {
                type: "object",
                required: [
                    "clientInfo",
                    "pageType",
                    "additionalFeatures",
                    "timeline",
                    "estimatedDays",
                    "deliveryDate",
                    "totalPrice",
                ],
                properties: {
                    clientInfo: { $ref: "#/components/schemas/ClientInfo" },
                    pageType: { $ref: "#/components/schemas/SelectedPageType" },
                    additionalFeatures: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/AdditionalFeature",
                        },
                    },
                    timeline: {
                        type: "string",
                        enum: ["urgent", "normal", "extended"],
                        example: "normal",
                    },
                    estimatedDays: { type: "number", example: 7 },
                    deliveryDate: {
                        type: "string",
                        example: "13 de diciembre de 2025",
                    },
                    totalPrice: { type: "number", example: 350 },
                    generatedAt: { type: "string", format: "date-time" },
                    budgetNumber: {
                        type: "string",
                        example: "PRES-202412-1001",
                    },
                },
            },
            Error: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: false },
                    message: {
                        type: "string",
                        example: "Error en la operación",
                    },
                },
            },
            SuccessResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Operación exitosa" },
                    data: { type: "object" },
                },
            },
        },
    },
};
