# API Devanthos

API Backend desarrollada con Node.js, Express y TypeScript.

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
│   ├── types/           # Tipos y definiciones TypeScript
│   ├── utils/           # Utilidades y helpers
│   ├── app.ts           # Configuración de Express
│   └── index.ts         # Punto de entrada
├── dist/                # Código compilado (generado)
├── .env                 # Variables de entorno (no commitear)
├── .env.example         # Ejemplo de variables de entorno
├── .gitignore
├── tsconfig.json        # Configuración de TypeScript
├── package.json
└── README.md
```

## 🚀 Instalación

1. Clonar el repositorio
2. Instalar dependencias:
    ```bash
    pnpm install
    ```
3. Configurar variables de entorno:
    ```bash
    cp .env.example .env
    ```
4. Ejecutar en desarrollo:
    ```bash
    pnpm dev
    ```

## 📜 Scripts Disponibles

-   `pnpm start` - Inicia el servidor en producción (código compilado)
-   `pnpm dev` - Inicia el servidor en desarrollo con hot reload usando tsx
-   `pnpm build` - Compila el código TypeScript a JavaScript
-   `pnpm test` - Ejecuta los tests

## 🔗 Endpoints Base

-   `GET /health` - Health check del servidor
-   `GET /api` - Información de la API

## 🛠️ Tecnologías

-   **TypeScript** - Superset de JavaScript con tipos estáticos
-   **Express** - Framework web
-   **Helmet** - Seguridad HTTP headers
-   **CORS** - Cross-Origin Resource Sharing
-   **Morgan** - Logger de peticiones HTTP
-   **Dotenv** - Gestión de variables de entorno
-   **tsx** - Ejecutor de TypeScript para desarrollo

## 📝 TypeScript

Este proyecto utiliza TypeScript de forma nativa con configuración estricta. Los archivos TypeScript se encuentran en la carpeta `src/` y se compilan a JavaScript en la carpeta `dist/`.

### Características TypeScript:

-   Tipos estrictos habilitados
-   Interfaces para configuración y respuestas API
-   Tipos personalizados para Express en `src/types/`
-   Source maps para debugging
-   Compilación incremental

### Desarrollo:

Para desarrollo, usamos `tsx` que permite ejecutar TypeScript directamente sin necesidad de compilar:

```bash
pnpm dev
```

### Producción:

Para producción, primero compila el código:

```bash
pnpm build
pnpm start
```
