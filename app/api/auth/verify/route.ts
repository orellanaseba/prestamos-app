import { verifyToken } from "@/app/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const token = req.headers.get("cookie")?.split("=")[1];
    
    if(!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    try {
        const decode = verifyToken(token);
        return NextResponse.json(decode, { status: 200 })
    }
    catch (err) {
        return NextResponse.json({ error: "Token no válido", err }, { status: 401 });
    }
}