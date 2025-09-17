/**
 * 外联话术 DTO
 */
export interface OutreachMessage {
    channel: "email" | "linkedin" | "whatsapp";
    language: string;
    content: string;
  }
  