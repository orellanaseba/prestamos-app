import { z } from "zod";

export const clientSchema = z.object({
    nombre: z.string()
    .min(5, { message: "El nombre debe tener mínimo 5 caracteres." })
    .max(30, { message: "El nombre no puede contener más de 30 caracteres." }),

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

})