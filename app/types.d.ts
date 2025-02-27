export interface Client {
    nombre: string;
    dni: string;
    email: string;
    numero_telefono: string;
}

export interface Loan {
    id_loan: string;
    nombre_cliente: string;
    monto_prestamo: string;
    cantidad_cuotas: string;
    interes: string;
    dni_cliente: string;
    fecha_emision: Date;
    fecha_pago: Date;
    pagado: boolean;
}