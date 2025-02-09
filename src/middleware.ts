import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const expectedKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiKey = req.headers.get("Authorization");

  console.log("==========================" + expectedKey);

  if (!apiKey || apiKey !== expectedKey) {
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*", // Proteger todas las rutas dentro de /api/
};