const express = require("express");
const router = express.Router();

// Importar rutas específicas
// const userRoutes = require('./user.routes');
// const authRoutes = require('./auth.routes');

// Ruta de bienvenida
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Bienvenido a la API de Devanthos",
        version: "1.0.0",
    });
});

// Registrar rutas
// router.use('/users', userRoutes);
// router.use('/auth', authRoutes);

module.exports = router;
