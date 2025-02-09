import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const files = await readdir(uploadDir);

    return NextResponse.json({ files });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "No se pudieron listar los archivos" }, { status: 500 });
  }
}
