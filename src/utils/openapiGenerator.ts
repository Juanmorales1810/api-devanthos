/**
 * Generador automático de especificación OpenAPI
 * Escanea las rutas de Express y genera la documentación
 */

import { Router } from "express";

interface RouteInfo {
    method: string;
    path: string;
    stack: any[];
}

/**
 * Extrae información de las rutas de un router de Express
 */
export function extractRoutes(
    router: Router,
    basePath: string = ""
): RouteInfo[] {
    const routes: RouteInfo[] = [];

    if (!router || !router.stack) return routes;

    router.stack.forEach((middleware: any) => {
        if (middleware.route) {
            // Ruta directa
            const path = basePath + middleware.route.path;
            Object.keys(middleware.route.methods).forEach((method) => {
                routes.push({
                    method: method.toUpperCase(),
                    path,
                    stack: middleware.route.stack,
                });
            });
        } else if (middleware.name === "router" && middleware.handle.stack) {
            // Sub-router
            const subPath = middleware.regexp
                .toString()
                .replace("/^", "")
                .replace("\\/?(?=\\/|$)/i", "")
                .replace(/\\\//g, "/");

            const cleanPath = basePath + "/" + subPath.split("/")[1];
            routes.push(...extractRoutes(middleware.handle, cleanPath));
        }
    });

    return routes;
}

/**
 * Genera paths de OpenAPI desde un array de RouteInfo
 */
export function generateOpenApiPaths(routes: RouteInfo[]): Record<string, any> {
    const paths: Record<string, any> = {};

    routes.forEach((route) => {
        if (!paths[route.path]) {
            paths[route.path] = {};
        }

        const method = route.method.toLowerCase();

        // Determinar el tag basado en la ruta
        const tag = route.path.split("/")[2] || "General";
        const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);

        paths[route.path][method] = {
            tags: [capitalizedTag],
            summary: `${method.toUpperCase()} ${route.path}`,
            description: `Endpoint para ${method} en ${route.path}`,
            responses: {
                "200": {
                    description: "Operación exitosa",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/SuccessResponse",
                            },
                        },
                    },
                },
                "400": {
                    description: "Petición inválida",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Error",
                            },
                        },
                    },
                },
                "500": {
                    description: "Error del servidor",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Error",
                            },
                        },
                    },
                },
            },
        };

        // Agregar requestBody para métodos POST/PUT/PATCH
        if (["post", "put", "patch"].includes(method)) {
            paths[route.path][method].requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                        },
                    },
                },
            };
        }
    });

    return paths;
}

/**
 * Extrae tags únicos de las rutas
 */
export function extractTags(
    routes: RouteInfo[]
): Array<{ name: string; description: string }> {
    const tagsSet = new Set<string>();

    routes.forEach((route) => {
        const tag = route.path.split("/")[2] || "General";
        const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
        tagsSet.add(capitalizedTag);
    });

    return Array.from(tagsSet).map((tag) => ({
        name: tag,
        description: `Endpoints relacionados con ${tag.toLowerCase()}`,
    }));
}
