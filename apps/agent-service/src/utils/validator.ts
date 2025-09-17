/**
 * src/utils/validator.ts
 *
 * 输入/输出数据校验
 * - 确保前后端 DTO 一致
 */
import { z } from "zod";

export const CompanyInputSchema = z.object({
  name: z.string().min(1, "公司名不能为空"),
  country: z.string().optional(),
});

export const OutreachMessageSchema = z.object({
  channel: z.enum(["email", "linkedin", "whatsapp"]),
  language: z.string(),
  content: z.string().min(5),
});

export const ThirdPartyMessageSchema = z.object({
  channel: z.enum(["email", "linkedin", "whatsapp", "crm"]),
  direction: z.enum(["inbound", "outbound"]),
  content: z.string().min(1),
});
