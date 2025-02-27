import { z } from "zod";

export const clientSchema = z.object({
    nombre: z.string()
    .min(5, { message: "El nombre debe tener mínimo 5 caracteres." })
    .max(30, { message: "El nombre no puede contener más de 30 caracteres." })
    .regex(/^[a-zA-Z\s]+$/, { message: "El nombre solo puede contener letras y espacios." })
    ,

    dni: z.string()
    .min(8, { message: "El DNI debe contener 8 números sin puntos ni comas." })
    .max(8, { message: "El DNI debe contener 8 caracteres como máximo." }),

    email: z.string()
    .min(1, { message: "El email es obligatorio" })
    .email({ message: "El email debe estar en un formato correcto." }),

    numero_telefono: z.string()
    .min(10, { message: "El número telefónico debe contener 10 caracteres." })
    .max(10, { message: "El número telefónico no puede contener más de 10 caracteres." })
})

export const loanSchema = z.object({
    monto_prestamo: z.string()
    .min(4, { message: "El monto mínimo son $1000." })
    .regex(/^[^.,]+$/, { message: "El monto no debe contener puntos ni comas." }),

    fecha_emision: z.date({ message: "La fecha de emisión debe ser una fecha válida." }),
    fecha_pago: z.date({ message: "La fecha de pago debe ser una fecha válida." })
}).refine(data => data.fecha_emision <= data.fecha_pago, {
    message: "La fecha de emisión debe ser menor o igual a la fecha de pago.",
    path: ["fecha_pago"]
});