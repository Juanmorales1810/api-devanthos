# API Devanthos

API Backend desarrollada con Node.js y Express.

## 📁 Estructura del Proyecto

```
api-devanthos/
├── src/
│   ├── config/          # Configuración de la aplicación
│   ├── controllers/     # Controladores de las rutas
│   ├── middlewares/     # Middlewares personalizados
│   ├── models/          # Modelos de datos
│   ├── routes/          # Definición de rutas
│   ├── services/        # Lógica de negocio
│   ├── utils/           # Utilidades y helpers
│   ├── app.js           # Configuración de Express
│   └── index.js         # Punto de entrada
├── .env                 # Variables de entorno (no commitear)
├── .env.example         # Ejemplo de variables de entorno
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Instalación

1. Clonar el repositorio
2. Instalar dependencias:
    ```bash
    npm install
    ```
3. Configurar variables de entorno:
    ```bash
    cp .env.example .env
    ```
4. Ejecutar en desarrollo:
    ```bash
    npm run dev
    ```

## 📜 Scripts Disponibles

-   `npm start` - Inicia el servidor en producción
-   `npm run dev` - Inicia el servidor en desarrollo con hot reload
-   `npm test` - Ejecuta los tests

## 🔗 Endpoints Base

-   `GET /health` - Health check del servidor
-   `GET /api` - Información de la API

## 🛠️ Tecnologías

-   **Express** - Framework web
-   **Helmet** - Seguridad HTTP headers
-   **CORS** - Cross-Origin Resource Sharing
-   **Morgan** - Logger de peticiones HTTP
-   **Dotenv** - Gestión de variables de entorno
