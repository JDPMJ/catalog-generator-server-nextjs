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

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setUploadedFileName(data.fileName);
  };

  const fetchFiles = async () => {
    const res = await fetch("/api/files");
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
              <a href={`/api/download/${file}`} download>{file}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}