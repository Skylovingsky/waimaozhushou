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

// 本地构造与后端 CompanyAgent.ts 一致的 Prompt，用于演示展示
function buildCompanyAgentPrompt(companyName: string): string {
  return `
你是一名资深外贸业务员，请对以下公司进行全面调研：

公司名称: ${companyName}

请执行以下任务：
1. 联网搜索该公司（至少返回5个不同的网页作为证据）。
2. 综合分析公司情况，从以下5个维度给出判断：
   - 真实性 (authenticity)：是否是真实存在的公司？
   - 产品契合度 (product_fit)：其产品是否适合与我们合作？
   - 可靠性 (reliability)：公司信誉、历史、客户评价如何？
   - 市场地位 (market_position)：在行业中的位置和竞争力如何？
   - 风险与机会 (risk_opportunity)：潜在的风险点与合作机会。
3. 提炼公司总结 (summary)，并列出主要产品 (products)。
4. 提取联系方式 (email / phone / website / LinkedIn)。
5. 最终给出一个综合判断 (final_judgment)：是否适合合作，并给出分数 (0-100) 与原因。
6. 生成多语言外联话术 (OutreachMessage)，至少包含：
   - 一封英文 Email
   - 一条 LinkedIn 私信
   - 一条 WhatsApp 消息

输出格式必须是 JSON，严格符合以下结构：
{
  "profile": {
    "company_name": "...",
    "summary": "...",
    "products": ["..."],
    "contacts": {
      "email": "...",
      "phone": "...",
      "website": "...",
      "linkedin": "..."
    },
    "country": "...",
    "evidence_pages": [
      { "url": "...", "snippet": "..." },
      { "url": "...", "snippet": "..." }
    ],
    "analysis": {
      "authenticity": { "status": "...", "evidence": ["..."], "score": 90 },
      "product_fit": { "status": "...", "evidence": ["..."], "score": 80 },
      "reliability": { "status": "...", "evidence": ["..."], "score": 85 },
      "market_position": { "status": "...", "evidence": ["..."], "score": 88 },
      "risk_opportunity": { "risks": ["..."], "opportunities": ["..."], "evidence": ["..."] }
    },
    "final_judgment": {
      "recommendation": "适合合作",
      "overall_score": 87,
      "reason": "公司规模大，信誉好"
    }
  },
  "outreach": [
    { "channel": "email", "language": "en", "content": "..." },
    { "channel": "linkedin", "language": "en", "content": "..." },
    { "channel": "whatsapp", "language": "en", "content": "..." }
  ]
}`.trim();
}

// 为了符合现有页面用法，返回 { report: prompt }
export async function fetchCompanyReport(name: string, country: string): Promise<{ report: string }> {
  return { report: buildCompanyAgentPrompt(name) };
}

// 外联话术（前端演示用 mock；接入后端后替换为真实请求）
export async function fetchOutreachMessages(companyId: string): Promise<OutreachMessage[]> {
  return [
    { channel: "email", language: "en", content: "Subject: Potential Partnership\n\nHello, we'd like to discuss cooperation..." },
    { channel: "linkedin", language: "en", content: "Hi, I'm reaching out regarding potential collaboration..." },
    { channel: "whatsapp", language: "en", content: "Hello! May I introduce our products and explore partnership?" },
  ];
}
  