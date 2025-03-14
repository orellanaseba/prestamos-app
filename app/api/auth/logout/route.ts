import { NextResponse } from "next/server";

export const POST = async() => {
    const response = NextResponse.json({ message: "Sesión cerrada" });

    response.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0, // Duración cero para eliminar la cookie
        path: '/', // Asegúrate de que coincida con el path original
    })

    return response;
}