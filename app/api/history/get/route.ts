import pool from "@/app/db/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const id_cliente = searchParams.get("id_cliente");

        if (!id_cliente) {
            return NextResponse.json({ error: "ID del cliente  no proporcionado" }, { status: 400 });
        }

        // Consultar el historial en la base de datos
        const result = await pool.query("SELECT * FROM history WHERE id_cliente = $1", [id_cliente]);

        if (result.rowCount === 0) {
            return NextResponse.json({ error: "Historial no encontrado" }, { status: 404 });
        }

        return NextResponse.json(result.rows, { status: 200 });
    }
    catch(err) {
        return NextResponse.json({ error: "Historial no encontrado", err }, { status: 404 })
    }
}