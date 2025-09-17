/**
 * 公司调研结果 DTO
 * - 后端 Agent 生成
 * - 存 DB
 * - 前端展示
 */
export interface EvidencePage {
    url: string;
    snippet: string;
  }
  
  export interface ContactInfo {
    email?: string;
    phone?: string;
    website?: string;
    linkedin?: string;
  }
  
  export interface AnalysisDimension {
    status: string;       // "可信" / "不可信" 等
    evidence: string[];   // 引用的 evidence_pages.url
    score: number;        // 0-100
  }
  
  export interface RiskOpportunity {
    risks: string[];
    opportunities: string[];
    evidence: string[];
  }
  
  export interface MessageFeedback {
    status: "积极" | "中性" | "消极";
    evidence: string[];
    score: number;
  }
  
  export interface FinalJudgment {
    recommendation: string;   // "适合合作" / "不适合合作"
    overall_score: number;    // 0-100
    reason: string;
  }
  
  export interface CompanyProfile {
    company_name: string;
    summary: string;
    products: string[];
    contacts: ContactInfo;
    country: string;
    evidence_pages: EvidencePage[];
  
    analysis: {
      authenticity: AnalysisDimension;
      product_fit: AnalysisDimension;
      reliability: AnalysisDimension;
      market_position: AnalysisDimension;
      risk_opportunity: RiskOpportunity;
      message_feedback?: MessageFeedback;
    };
  
    final_judgment: FinalJudgment;
  }
  