import { z } from "zod";

export const merchantSchema = z.object({
  name: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre corto es demasiado largo'),
  documentType: z.enum(["DNI", "RUC"]),
  document: z.string().min(8, 'El documento debe tener mayor o igual a 8 caracteres'),
  occupation: z.string()
    .min(3, "Debe seleccionar una ocupación"),
  district: z.string()
    .min(3, "Debe seleccionar un distrito")
}).refine((data) => {
  if (data.documentType === "DNI") {
    return data.document.length === 8;
  } else {
    return data.document.length === 11;
  }
});

export const merchantStep1Schema = merchantSchema.pick({
  name: true,
  document: true,
  documentType: true,
});

export const merchantStep2Schema = merchantSchema.pick({
  occupation: true,
  district: true,
});

export type MerchantFormData = z.infer<typeof merchantSchema>;
