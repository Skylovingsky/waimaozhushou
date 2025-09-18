"use client";

import { useCallback, useState } from "react";
import * as XLSX from "xlsx";
import { useRouter } from "next/router";

interface ParsedCompany {
  name: string;
  country: string;
}

export default function UploadPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<ParsedCompany[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const parseFile = async (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !["xlsx", "xls", "csv"].includes(ext)) {
      alert("仅支持 .xlsx / .csv 文件");
      return;
    }

    setIsLoading(true);
    try {
      const data = await file.arrayBuffer();
      let rows: any[] = [];

      if (ext === "csv") {
        const text = new TextDecoder("utf-8").decode(new Uint8Array(data));
        // 简易 CSV 解析（逗号分隔，首行为表头）
        const [headerLine, ...lines] = text.split(/\r?\n/).filter(Boolean);
        const headers = headerLine.split(",").map((h) => h.trim().toLowerCase());
        rows = lines.map((line) => {
          const cells = line.split(",");
          const record: Record<string, string> = {};
          headers.forEach((h, i) => (record[h] = (cells[i] || "").trim()));
          return record;
        });
      } else {
        const workbook = XLSX.read(data);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        rows = XLSX.utils.sheet_to_json(sheet);
      }

      const list: ParsedCompany[] = rows
        .map((row) => ({
          name: (row["name"] || row["公司"] || row["company"] || "").toString().trim(),
          country: (row["country"] || row["国家"] || "").toString().trim(),
        }))
        .filter((r) => r.name);

      setCompanies(list);
    } catch (e) {
      console.error(e);
      alert("解析文件失败");
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) parseFile(file);
  }, []);

  const onBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) parseFile(file);
  };

  const goOverview = () => {
    if (companies.length === 0) {
      alert("请先上传公司名单");
      return;
    }
    // 将数据带到下一页（简单做法：使用 sessionStorage）
    sessionStorage.setItem("fta_companies", JSON.stringify(companies));
    router.push("/overview");
  };

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">上传公司名单</h1>
      <p className="text-gray-600">请上传包含公司名称和国家的 Excel 文件</p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`border-2 border-dashed rounded-lg p-10 text-center transition ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <p className="mb-3 font-medium">拖拽文件到这里 或 点击上传</p>
        <p className="text-sm text-gray-500 mb-4">支持 .xlsx / .csv</p>
        <label className="inline-block px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
          选择文件
          <input type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={onBrowse} />
        </label>
      </div>

      {companies.length > 0 && (
        <div className="p-4 border rounded bg-white flex items-center justify-between">
          <p>✔ 已识别 {companies.length} 家公司</p>
          <button
            onClick={goOverview}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            前往调研结果
          </button>
        </div>
      )}

      {isLoading && (
        <div className="text-gray-600">⏳ 正在调研，请稍候...</div>
      )}
    </main>
  );
}
