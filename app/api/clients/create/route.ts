import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/db/db";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { id_cliente, nombre, dni, email, numero_telefono } = body;

        const result = await pool.query(
            "INSERT INTO clients (id_cliente, nombre, dni, email, numero_telefono) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [id_cliente, nombre, dni, email, numero_telefono]
        );

        return NextResponse.json(result.rows[0], { status: 201 })
    }
    catch(err) {
        return NextResponse.json({ error: "Error al guardar el cliente", err })
    }
}