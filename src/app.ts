import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { apiReference } from "@scalar/express-api-reference";

import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";
import { openApiSpec } from "./openapi";

const app: Application = express();

// Middlewares de seguridad y utilidades
app.use(
    helmet({
        contentSecurityPolicy: false, // Deshabilitar CSP para Scalar
        crossOriginEmbedderPolicy: false,
    })
);
app.use(cors());
app.use(morgan("dev"));

// Parseo de JSON y URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.use("/api", routes);

// Documentación de API con Scalar
app.get("/openapi.json", (_req: Request, res: Response) => {
    res.json(openApiSpec);
});

app.use(
    "/docs",
    apiReference({
        theme: "purple",
        spec: {
            content: openApiSpec,
        },
    })
);

// Ruta de health check
app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
    });
});

// Manejo de rutas no encontradas
app.use((_req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Ruta no encontrada",
    });
});

// Middleware de manejo de errores
app.use(errorHandler);

export default app;
