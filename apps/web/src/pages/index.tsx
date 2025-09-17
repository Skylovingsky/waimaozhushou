"use client";

import { useState } from "react";
import UploadForm from "../components/UploadForm";
import ReportCard from "../components/ReportCard";
import { fetchCompanyReport, Company } from "../lib/api";

export default function HomePage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  // 处理 Excel 上传
  const handleUpload = (parsedCompanies: Company[]) => {
    setCompanies(parsedCompanies);
  };

  // 调用 AI 搜索
  const handleSearch = async (index: number, company: Company) => {
    setLoadingIndex(index);
    try {
      const data = await fetchCompanyReport(company.name, company.country);
      const updatedCompanies = [...companies];
      updatedCompanies[index].aiInfo = data.report;
      setCompanies(updatedCompanies);
    } catch (err) {
      console.error("AI 搜索失败", err);
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">外贸助手</h1>

      {/* 上传 Excel */}
      <UploadForm onUpload={handleUpload} />

      {/* 公司卡片列表 */}
      <div className="mt-6 grid grid-cols-1 gap-4">
        {companies.map((c, idx) => (
          <ReportCard
            key={idx}
            name={c.name}
            country={c.country}
            aiInfo={c.aiInfo}
            loading={loadingIndex === idx}
            onSearch={() => handleSearch(idx, c)}
          />
        ))}
      </div>
    </main>
  );
}
