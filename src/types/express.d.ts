// Extensiones de tipos para Express
// Puedes agregar propiedades personalizadas a los objetos Request y Response aquí

import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            // Ejemplo: agregar usuario autenticado
            // user?: {
            //     id: string;
            //     email: string;
            //     role: string;
            // };
        }
    }
}

export {};
