import pool from "@/app/db/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { id_loan, id_cliente, ...rest } = body;

        const result = await pool.query(
            `INSERT INTO loans (id_loan, id_cliente, ${Object.keys(rest).join(", ")})
             VALUES ($1, $2, ${Object.keys(rest).map((_, i) => `$${i + 3}`).join(", ")})
             RETURNING *`,
            [id_loan, id_cliente, ...Object.values(rest)]
        );

        return NextResponse.json(result.rows[0], { status: 200 })
    }
    catch(err) {
        return NextResponse.json({ message: "Error al crear un préstamo", err })
    }
}