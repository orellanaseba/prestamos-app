import pool from "@/app/db/db";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const result = await pool.query("SELECT * FROM clients");
        return NextResponse.json(result.rows, { status: 200 });
    }
    catch(err) {
        return NextResponse.json({ error: "Error al obtener los clientes", err })
    }
}