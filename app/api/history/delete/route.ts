import pool from "@/app/db/db";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
    try {
        const { id_loan } = await req.json();
        if(!id_loan) {
            return NextResponse.json({ error: "ID del historial no proporcionado"}, { status: 400 })
        }
        const result = await pool.query("DELETE FROM history WHERE id_loan = $1 RETURNING *", [id_loan]);

        if (result.rowCount === 0) {
            return NextResponse.json({ error: "Historial no encontrado" }, { status: 404 });
        }        

        return NextResponse.json({ message: "Historial eliminado correctamente", result})
    }
    catch (err) {
        console.log("Error al eliminar el historial:", err);
        return NextResponse.json({ error: "Error al eliminar el cliente", err })
    }
}