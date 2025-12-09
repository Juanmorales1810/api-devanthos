import express, { Request, Response, Router } from "express";
import budgetRoutes from "./budget.routes";

const router: Router = express.Router();

// Importar rutas específicas
// import userRoutes from './user.routes';
// import authRoutes from './auth.routes';

// Ruta de bienvenida
router.get("/", (_req: Request, res: Response) => {
    res.json({
        success: true,
        message: "Bienvenido a la API de Devanthos",
        version: "1.0.0",
    });
});

// Registrar rutas
router.use("/budget", budgetRoutes);
// router.use('/users', userRoutes);
// router.use('/auth', authRoutes);

export default router;
