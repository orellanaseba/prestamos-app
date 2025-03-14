// Archivo para implementar el token
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET || "clavededashboardpersonal"

export const generateToken = (userId: string) => {
    // Este método se utiiza para generar un token a partir de un ID de un usuario
    // El token expira pasada la hora (1h)
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
}

export const verifyToken = (userId: string) => {
    try {
        return jwt.verify(userId, SECRET_KEY);
    }
    catch(err) {
        return NextResponse.json({ error: "Error al verificar el token.", err })
    }
}