import pool from "@/app/db/db";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
    try {
        const { id_cliente } = await req.json();
        const result = await pool.query("DELETE FROM clients WHERE id_cliente = $1 RETURNING *", [id_cliente])
        return NextResponse.json({ message: "Cliente eliminado correctamente", result})
    }
    catch (err) {
        return NextResponse.json({ error: "Error al eliminar el cliente", err })
    }
}