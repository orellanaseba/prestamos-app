export interface Client {
    id_cliente?: string;
    nombre: string;
    dni: string;
    email: string;
    numero_telefono: string;
}

export interface Loan {
    id_loan: string;
    id_cliente: string;
    nombre_cliente: string;
    monto_prestamo: number;
    cantidad_cuotas: number;
    periodo_pago: string;
    monto_cuotas: number;
    interes: number;
    dni_cliente: string;
    fecha_emision: Date;
    fecha_pago: Date;
    pagado: boolean;
    cuotas_pagadas: number[];
}