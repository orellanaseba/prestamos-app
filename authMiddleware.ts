import { verifyToken } from "./app/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
    // Capturamos el token mediante la request
    const token = req.cookies.get("token")?.value;

    if (req.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.next();
    }

    if(!token) return NextResponse.redirect(new URL("/login", req.url));

    const decoded = verifyToken(token)

    if(!decoded) return NextResponse.redirect(new URL("/login", req.url));

    return NextResponse.next();
}

export const config = {
    matcher: ["/:path*"],
}