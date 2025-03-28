import pool from "@/app/db/db";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const result = await pool.query(`SELECT stock FROM stock`);

        if (result.rowCount === 0) {
            return NextResponse.json({ error: "Stock no encontrado" }, { status: 404 });
        }

        return NextResponse.json({ stock: result.rows[0].stock });
    } catch (err) {
        console.error("Error al obtener el stock:", err);
        return NextResponse.json({ error: "Error al obtener el stock" }, { status: 500 });
    }
};