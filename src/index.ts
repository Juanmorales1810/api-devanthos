import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📍 Entorno: ${process.env.NODE_ENV || "development"}`);
});
