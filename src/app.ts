import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";

const app: Application = express();

// Middlewares de seguridad y utilidades
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// Parseo de JSON y URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.use("/api", routes);

// Ruta de health check
app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
    });
});

// Manejo de rutas no encontradas
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: "Ruta no encontrada",
    });
});

// Middleware de manejo de errores
app.use(errorHandler);

export default app;
