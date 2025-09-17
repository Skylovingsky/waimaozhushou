/**
 * 第三方消息 DTO
 */
export interface ThirdPartyMessage {
    channel: "email" | "linkedin" | "whatsapp" | "crm";
    direction: "inbound" | "outbound";
    content: string;
    metadata?: Record<string, any>;
    timestamp?: string; // ISO 时间戳
  }
  