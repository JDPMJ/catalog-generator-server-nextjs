import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { readFile } from "fs/promises";

export async function GET(req: NextRequest, { params }: { params: { file: string } }) {
  try {
    const filePath = path.join(process.cwd(), "public/uploads", params.file);
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${params.file}"`,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Archivo no encontrado" }, { status: 404 });
  }
}