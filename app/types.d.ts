export interface Client {
    nombre: string;
    dni: string;
    email: string;
    numero_telefono: string;
}

export interface Loan {
    monto_prestamo: string;
    cantidad_cuotas: string;
    interes: string;
    nombre_cliente: string;
    fecha_emision: string;
    fecha_pago: string;
}