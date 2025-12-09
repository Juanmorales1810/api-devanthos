import { Request, Response, RequestHandler } from "express";
import { BudgetRequest } from "../models/budget.model";
import { BudgetPdfService } from "../services/budgetPdf.service";
import asyncHandler from "../utils/asyncHandler";
import { errorResponse } from "../utils/responseHelper";

/**
 * Controlador para generar y descargar PDF de presupuesto
 */
export const generateBudgetPdf: RequestHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const budgetData: BudgetRequest = req.body;

        // Validar datos requeridos
        if (!budgetData.clientInfo || !budgetData.pageType) {
            errorResponse(
                res,
                "Faltan datos requeridos: clientInfo y pageType son obligatorios",
                400
            );
            return;
        }

        // Validar información del cliente
        if (!budgetData.clientInfo.name || !budgetData.clientInfo.email) {
            errorResponse(
                res,
                "Faltan datos del cliente: name y email son obligatorios",
                400
            );
            return;
        }

        // Validar tipo de página
        if (!budgetData.pageType.name || !budgetData.pageType.basePrice) {
            errorResponse(
                res,
                "Faltan datos del tipo de página: name y basePrice son obligatorios",
                400
            );
            return;
        }

        try {
            // Generar PDF
            const { pdfBuffer, budgetNumber } =
                await BudgetPdfService.generatePdf(budgetData);

            // Configurar headers para descarga
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
                "Content-Disposition",
                `attachment; filename="Presupuesto-${budgetNumber}.pdf"`
            );
            res.setHeader("Content-Length", pdfBuffer.length);

            // Enviar PDF directamente
            res.send(pdfBuffer);
        } catch (error) {
            console.error("Error en generateBudgetPdf:", error);
            errorResponse(res, "Error al generar el PDF del presupuesto", 500);
        }
    }
);
