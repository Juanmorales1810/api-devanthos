/**
 * Modelos de datos para la generación de presupuestos en PDF
 */

/**
 * Información del cliente
 */
export interface ClientInfo {
    name: string;
    email: string;
    company?: string;
    description?: string;
}

/**
 * Características de una página/proyecto
 */
export interface PageFeature {
    name: string;
    description: string;
    details: string[];
}

/**
 * Tipo de página web seleccionado
 */
export interface SelectedPageType {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    estimatedDays: number;
    features: PageFeature[];
}

/**
 * Característica adicional opcional
 */
export interface AdditionalFeature {
    id: string;
    name: string;
    price: number;
    description: string;
    benefits: string[];
}

/**
 * Timeline del proyecto
 */
export type Timeline = "urgent" | "normal" | "extended";

/**
 * Request completo del presupuesto
 */
export interface BudgetRequest {
    clientInfo: ClientInfo;
    pageType: SelectedPageType;
    additionalFeatures: AdditionalFeature[];
    timeline: Timeline;
    estimatedDays: number;
    deliveryDate: string;
    totalPrice: number;
    generatedAt?: string;
    budgetNumber?: string;
}

/**
 * Respuesta de la API
 */
export interface BudgetPdfResponse {
    success: boolean;
    pdfUrl?: string;
    pdfBase64?: string;
    message?: string;
    budgetNumber?: string;
    errorCode?: string;
}
