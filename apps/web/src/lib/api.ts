/**
 * apps/web/src/lib/api.ts
 *
 * 前端请求 API 封装
 */

export interface Company {
    id?: string;
    name: string;
    country: string;
    aiInfo?: string;
  }
  
  export interface OutreachMessage {
    channel: string;
    language: string;
    content: string;
  }
  
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  
  /**
   * 上传公司数据给后端
   */
  export async function uploadCompanies(companies: Company[]): Promise<Company[]> {
    const res = await fetch(`${BASE_URL}/company/upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companies }),
    });
    if (!res.ok) throw new Error("上传公司失败");
    return res.json();
  }
  
  /**
   * 调用 AI 生成公司报告
   */
  export async function fetchCompanyReport(name: string, country: string): Promise<{ report: string }> {
    const res = await fetch(`${BASE_URL}/company/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, country }),
    });
    if (!res.ok) throw new Error("获取公司报告失败");
    return res.json();
  }
  
  /**
   * 获取某个公司的外联话术
   */
  export async function fetchOutreachMessages(companyId: string): Promise<OutreachMessage[]> {
    const res = await fetch(`${BASE_URL}/outreach/${companyId}`);
    if (!res.ok) throw new Error("获取外联话术失败");
    return res.json();
  }
  