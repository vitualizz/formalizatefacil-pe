import { z } from "zod";

export const saleSchema = z.object({
  date: z.string().min(1, "La fecha es requerida"),
  description: z
    .string()
    .min(3, "La descripción debe tener al menos 3 caracteres")
    .max(100, "La descripción no puede exceder 100 caracteres"),
  amount: z
    .number()
    .positive("El monto debe ser mayor a 0")
    .max(999999999, "El monto es muy grande"),
});

export type SaleFormData = z.infer<typeof saleSchema>;
