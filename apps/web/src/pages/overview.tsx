"use client";

import { useEffect, useMemo, useState } from "react";

type AnalysisDimension = {
  status: string;
  evidence: string[];
  score: number;
};

type RiskOpportunity = {
  risks: string[];
  opportunities: string[];
  evidence: string[];
};

type OutreachMessage = {
  channel: "email" | "linkedin" | "whatsapp";
  language: string;
  content: string;
};

type CompanyProfile = {
  company_name: string;
  summary: string;
  products: string[];
  contacts: {
    email?: string;
    phone?: string;
    website?: string;
    linkedin?: string;
  };
  country: string;
  evidence_pages: { url: string; snippet: string }[];
  analysis: {
    authenticity: AnalysisDimension;
    product_fit: AnalysisDimension;
    reliability: AnalysisDimension;
    market_position: AnalysisDimension;
    risk_opportunity: RiskOpportunity;
    message_feedback?: { status: string; evidence: string[]; score: number };
  };
  final_judgment: { recommendation: string; overall_score: number; reason: string };
};

function ScoreTag({ score }: { score: number }) {
  const color = score >= 85 ? "text-green-600" : score >= 70 ? "text-yellow-600" : "text-red-600";
  return <span className={`font-semibold ${color}`}>{score} 分</span>;
}

function Copy({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="px-2 py-1 text-xs border rounded hover:bg-gray-50"
    >
      复制
    </button>
  );
}

export default function OverviewPage() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [tabIndex, setTabIndex] = useState<Record<number, number>>({});

  const companies = useMemo(() => {
    const raw = sessionStorage.getItem("fta_companies");
    if (!raw) return [] as { name: string; country: string }[];
    try {
      return JSON.parse(raw) as { name: string; country: string }[];
    } catch {
      return [];
    }
  }, []);

  // 用 mock 将 CompanyAgent 的输出结构渲染（真实项目改为请求后端）
  const profiles: CompanyProfile[] = companies.map((c, i) => ({
    company_name: c.name,
    summary: `${c.name} 的概要信息...`,
    products: ["汽车零件", "制动系统", "传感器"],
    contacts: { email: "info@company.com", phone: "+1-202-xxxx", website: "https://example.com", linkedin: "https://linkedin.com/company/example" },
    country: c.country,
    evidence_pages: [
      { url: "https://example.com/1", snippet: "证据摘要 1" },
      { url: "https://example.com/2", snippet: "证据摘要 2" },
    ],
    analysis: {
      authenticity: { status: "可信", evidence: ["https://example.com/1"], score: 90 },
      product_fit: { status: "较高", evidence: ["https://example.com/2"], score: 80 },
      reliability: { status: "良好", evidence: ["https://example.com/1"], score: 85 },
      market_position: { status: "较强", evidence: ["https://example.com/2"], score: 88 },
      risk_opportunity: { risks: ["市场集中度高"], opportunities: ["新兴市场拓展"], evidence: ["https://example.com/1"] },
    },
    final_judgment: { recommendation: "适合合作", overall_score: 87, reason: "公司规模大，信誉好" },
  }));

  const outreachList: OutreachMessage[][] = companies.map(() => [
    { channel: "email", language: "en", content: "Email 内容 ..." },
    { channel: "linkedin", language: "en", content: "LinkedIn 内容 ..." },
    { channel: "whatsapp", language: "en", content: "WhatsApp 内容 ..." },
  ]);

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">调研结果 - 共 {profiles.length} 家公司</h1>

      <div className="space-y-4">
        {profiles.map((p, idx) => {
          const open = !!expanded[idx];
          const activeTab = tabIndex[idx] ?? 0;
          return (
            <div key={idx} className="border rounded-lg bg-white">
              {/* 折叠前 */}
              {!open && (
                <div className="p-4 flex flex-col md:flex-row md:items-center gap-3">
                  <div className="flex-1">
                    <p className="font-semibold">
                      {p.company_name} ({p.country})
                    </p>
                    <p className="text-gray-600 line-clamp-2 mt-1">{p.summary}</p>
                  </div>
                  <div className="text-sm text-gray-700">
                    综合评分：<ScoreTag score={p.final_judgment.overall_score} />
                    <span className="ml-2">{p.final_judgment.recommendation} ✅</span>
                  </div>
                  <button
                    onClick={() => setExpanded({ ...expanded, [idx]: true })}
                    className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    查看详情
                  </button>
                </div>
              )}

              {/* 展开后 */}
              {open && (
                <div className="p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold">
                        {p.company_name} ({p.country})
                      </h2>
                      <p className="text-gray-700 mt-2">{p.summary}</p>
                    </div>
                    <button
                      onClick={() => setExpanded({ ...expanded, [idx]: false })}
                      className="px-2 py-1 text-sm border rounded hover:bg-gray-50"
                    >
                      收起
                    </button>
                  </div>

                  {/* 产品 */}
                  <div>
                    <h3 className="font-semibold mb-2">主要产品</h3>
                    <div className="flex flex-wrap gap-2">
                      {p.products.map((prod, i) => (
                        <span key={i} className="px-2 py-1 text-xs bg-gray-100 rounded">
                          {prod}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 联系方式 */}
                  <div>
                    <h3 className="font-semibold mb-2">联系方式</h3>
                    <div className="space-y-1 text-sm">
                      <div>
                        📧 email: {p.contacts.email || "-"} <Copy text={p.contacts.email} />
                      </div>
                      <div>
                        ☎ phone: {p.contacts.phone || "-"} <Copy text={p.contacts.phone} />
                      </div>
                      <div>
                        🌐 website: {p.contacts.website ? (
                          <a className="text-blue-600 underline" href={p.contacts.website} target="_blank" rel="noreferrer">
                            {p.contacts.website}
                          </a>
                        ) : (
                          "-"
                        )}
                      </div>
                      <div>
                        💼 LinkedIn: {p.contacts.linkedin ? (
                          <a className="text-blue-600 underline" href={p.contacts.linkedin} target="_blank" rel="noreferrer">
                            {p.contacts.linkedin}
                          </a>
                        ) : (
                          "-"
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 证据来源 */}
                  <details className="border rounded">
                    <summary className="cursor-pointer select-none p-2 font-semibold">证据来源</summary>
                    <ul className="list-disc list-inside p-2 space-y-1">
                      {p.evidence_pages.map((e, i) => (
                        <li key={i}>
                          <a href={e.url} className="text-blue-600 underline" target="_blank" rel="noreferrer">
                            {e.url}
                          </a>
                          <span className="ml-2 text-gray-600 text-sm">{e.snippet}</span>
                        </li>
                      ))}
                    </ul>
                  </details>

                  {/* 分析维度 */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {([
                      ["真实性 authenticity", p.analysis.authenticity],
                      ["产品契合度 product_fit", p.analysis.product_fit],
                      ["可靠性 reliability", p.analysis.reliability],
                      ["市场地位 market_position", p.analysis.market_position],
                    ] as [string, AnalysisDimension][]).map(([label, dim], i) => (
                      <div key={i} className="border rounded p-3">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">{label}</p>
                          <ScoreTag score={dim.score} />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">状态：{dim.status}</p>
                        {dim.evidence.length > 0 && (
                          <details className="mt-2">
                            <summary className="text-sm text-gray-700 cursor-pointer select-none">证据</summary>
                            <ul className="list-disc list-inside text-sm text-gray-700">
                              {dim.evidence.map((ev, j) => (
                                <li key={j}>{ev}</li>
                              ))}
                            </ul>
                          </details>
                        )}
                      </div>
                    ))}

                    <div className="border rounded p-3 md:col-span-2">
                      <p className="font-semibold mb-2">风险与机会</p>
                      <div className="text-sm">
                        <p>风险：{p.analysis.risk_opportunity.risks.join("，") || "-"}</p>
                        <p>机会：{p.analysis.risk_opportunity.opportunities.join("，") || "-"}</p>
                      </div>
                    </div>
                  </div>

                  {/* 最终判断 */}
                  <div className="border rounded p-3">
                    <p className="font-semibold">最终判断</p>
                    <p className="text-sm mt-1">✅ {p.final_judgment.recommendation}</p>
                    <p className="text-sm">总分：{p.final_judgment.overall_score}</p>
                    <p className="text-sm text-gray-700">理由：{p.final_judgment.reason}</p>
                  </div>

                  {/* 外联话术 Tabs */}
                  <div className="border rounded">
                    <div className="flex border-b">
                      {["Email (EN)", "LinkedIn (EN)", "WhatsApp (EN)"].map((label, tIdx) => (
                        <button
                          key={tIdx}
                          className={`px-4 py-2 text-sm ${activeTab === tIdx ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
                          onClick={() => setTabIndex({ ...tabIndex, [idx]: tIdx })}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <div className="p-3 text-sm space-y-2">
                      <p>{outreachList[idx][activeTab].content}</p>
                      <button
                        onClick={() => navigator.clipboard.writeText(outreachList[idx][activeTab].content)}
                        className="px-3 py-1 border rounded hover:bg-gray-50 text-sm"
                      >
                        复制
                      </button>
                    </div>
                  </div>

                  {/* 操作按钮区 */}
                  <div className="flex gap-2">
                    <button className="px-3 py-2 border rounded hover:bg-gray-50">联系公司</button>
                    <button className="px-3 py-2 border rounded hover:bg-gray-50">忽略公司</button>
                    <button className="px-3 py-2 border rounded hover:bg-gray-50">生成新话术</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
