import pool from "@/app/db/db";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
    try {
        let { newStock } = await req.json();

        newStock = Math.round(newStock);

        const result = await pool.query(
            `UPDATE stock SET stock = $1 RETURNING *`, // Asegúrate de que `id = 1` sea correcto
            [newStock]
        );
        
        return NextResponse.json({ message: "Stock actualizado correctamente", stock: result.rows[0] });
    } catch (err) {
        console.error("Error al actualizar el stock:", err);
        return NextResponse.json({ error: "Error al actualizar el stock" }, { status: 500 });
    }
}