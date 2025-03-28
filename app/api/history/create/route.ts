import pool from "@/app/db/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();

        // Insertar el préstamo en la tabla `history`
        const result = await pool.query(
            `INSERT INTO history (
                id_loan,
                id_cliente,
                nombre_cliente,
                monto_prestamo,
                cantidad_cuotas,
                periodo_pago,
                monto_cuotas,
                interes,
                dni_cliente,
                fecha_emision,
                fecha_pago,
                pagado,
                cuotas_pagadas
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
            [
                body.id_loan,
                body.id_cliente,
                body.nombre_cliente,
                body.monto_prestamo,
                body.cantidad_cuotas,
                body.periodo_pago,
                body.monto_cuotas,
                body.interes,
                body.dni_cliente,
                body.fecha_emision,
                body.fecha_pago,
                body.pagado,
                body.cuotas_pagadas,
            ]
        );

        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error("Error al guardar el historial:", error);
        return NextResponse.json({ error: "Error al guardar el historial" }, { status: 500 });
    }
};