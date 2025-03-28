import pool from "@/app/db/db";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
    try {
        const { id_cliente, nombre, dni, email, numero_telefono } = await req.json();
        const result = await pool.query(
            `UPDATE clients 
             SET nombre = $1, dni = $2, email = $3, numero_telefono = $4
             WHERE id_cliente = $5`,
            [nombre, dni, email, numero_telefono, id_cliente]
        );

        await pool.query(
            `UPDATE loans 
             SET nombre_cliente = $1, dni_cliente = $2 
             WHERE id_cliente = $3`,
            [nombre, dni, id_cliente]
        );

        await pool.query(
            `UPDATE history 
             SET nombre_cliente = $1, dni_cliente = $2 
             WHERE id_cliente = $3`,
            [nombre, dni, id_cliente]
        );

        return NextResponse.json({ message: "Cliente actualizado correctamente", result })
    }
    catch(err) {
        return NextResponse.json({ error: "Error al actualizar el cliente", err }, {  status: 500})
    }
}