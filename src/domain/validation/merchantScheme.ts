import { z } from "zod";

export const merchantSchema = z.object({
  name: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre corto es demasiado largo'),
  documentType: z.enum(["DNI", "RUC"]),
  document: z.string(),
  occupation: z.string()
    .min(3, 'La ocupación debe tener al menos 3 caracteres')
    .max(100, 'La ocupación es demasiado larga'),
  district: z.string()
    .min(3, 'El distrito debe tener al menos 3 caracteres')
    .max(100, 'El distrito es demasiado largo'),
}).refine((data) => {
  if (data.documentType === "DNI") {
    return data.document.length === 8;
  } else {
    return data.document.length === 11;
  }
});

export type MerchantFormData = z.infer<typeof merchantSchema>;
