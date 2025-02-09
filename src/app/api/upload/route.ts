import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uploadDir = path.join(process.cwd(), "uploads");
    await writeFile(`${uploadDir}/${file.name}`, buffer);

    return NextResponse.json({ message: "Archivo subido con éxito", fileName: file.name });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error al subir el archivo" }, { status: 500 });
  }
}