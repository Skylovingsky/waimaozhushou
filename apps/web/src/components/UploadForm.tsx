"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

interface UploadFormProps {
  onUpload: (companies: { name: string; country: string }[]) => void;
}

export default function UploadForm({ onUpload }: UploadFormProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet);

    const companies = rows.map((row) => ({
      name: row["name"] || "Unknown",
      country: row["country"] || "Unknown",
    }));

    onUpload(companies);
  };

  return (
    <div className="p-4 border rounded bg-white shadow-sm">
      <p className="font-semibold mb-2">上传公司 Excel</p>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
      {fileName && <p className="text-sm text-gray-600 mt-2">已选择: {fileName}</p>}
    </div>
  );
}
