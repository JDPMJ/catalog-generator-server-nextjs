"use client";

import { useEffect, useState } from "react";

export default function Upload() {
  const [files, setFiles] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": `${process.env.NEXT_PUBLIC_API_KEY}`,
      }
    });
    const data = await res.json();
    setUploadedFileName(data.fileName);
  };

  const handleDownload = async (file: string) => {
    const res = await fetch(`/api/download/${file}`, {
      method: "GET",
      headers: {
        "Authorization": `${process.env.NEXT_PUBLIC_API_KEY}`,
      }
    });
    
    if (res.ok) {
      // Procesar la respuesta, por ejemplo, descargando el archivo
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = file; // Aquí asignas el nombre del archivo que se descargará
      link.click();
    } else {
      // Manejar el error si la petición falla
      console.error("Error en la descarga:", res.status);
    }
  };

  const fetchFiles = async () => {
    const res = await fetch("/api/files", {
      method: "GET",
      headers: {
        "Authorization": `${process.env.NEXT_PUBLIC_API_KEY}`,
      }
    });
    const data = await res.json();
    setFiles(data.files || []);
  };

  useEffect(() => {
    fetchFiles();
  }, []);
  

  return (
    <div>
      <div className="mb-4">
        <h1>Repositorio de Archivos PDF</h1>
        <form onSubmit={handleUpload}>
          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <button type="submit">Subir PDF</button>
        </form>

        {uploadedFileName && (
          <p>
            Archivo subido:{" "}
            <a href={`/api/download/${uploadedFileName}`} download>
              {uploadedFileName}
            </a>
          </p>
        )}
      </div>

      {/* Lista de archivos disponibles */}
      <div className="">
        <h2>Archivos Disponibles</h2>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <div onClick={() => handleDownload(file)}>{file}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}