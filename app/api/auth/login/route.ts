import { users } from "@/app/data/users";
import { generateToken } from "@/app/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { username, password } = await req.json();

    const user = users.find(usr => usr.username === username);

    if(!user) return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
    if(!password) return NextResponse.json({ error: "Contraseña incorrecta." }, { status: 401 });

    const token = generateToken(user.id);
    
    const response = NextResponse.json({ message: "Inicio de sesión exitoso!" });

    response.cookies.set("token", token, { httpOnly: true, path: "/" })

    return response;
}

