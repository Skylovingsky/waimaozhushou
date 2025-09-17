"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Company, fetchCompanyReport } from "../../lib/api";

export default function CompanyDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(false);

  // 模拟从后端加载公司信息
  useEffect(() => {
    if (!id) return;
    // TODO: 替换为后端 API，比如 fetchCompanyProfile(id)
    setCompany({
      id: id as string,
      name: "Siemens",
      country: "Germany",
    });
  }, [id]);

  // 调用 AI 获取报告
  const handleSearch = async () => {
    if (!company) return;
    setLoading(true);
    try {
      const data = await fetchCompanyReport(company.name, company.country);
      setCompany({ ...company, aiInfo: data.report });
    } catch (err) {
      console.error("AI 搜索失败", err);
    } finally {
      setLoading(false);
    }
  };

  if (!company) {
    return <p className="p-6">加载中...</p>;
  }

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{company.name}</h1>
      <p className="text-gray-600">{company.country}</p>

      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "加载中..." : "获取 AI 报告"}
      </button>

      {company.aiInfo && (
        <div className="p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">AI 报告</h2>
          <p className="text-sm whitespace-pre-line">{company.aiInfo}</p>
        </div>
      )}

      {/* 证据页面（可选，先放占位） */}
      <div className="p-4 border rounded bg-white">
        <h2 className="text-lg font-semibold mb-2">证据页面</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <a
              href="https://www.siemens.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Siemens 官网
            </a>
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Siemens"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Wikipedia 资料
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}
