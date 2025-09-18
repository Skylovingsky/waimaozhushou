"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThirdPartyMessageSchema = exports.OutreachMessageSchema = exports.CompanyInputSchema = void 0;
/**
 * src/utils/validator.ts
 *
 * 输入/输出数据校验
 * - 确保前后端 DTO 一致
 */
var zod_1 = require("zod");
exports.CompanyInputSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "公司名不能为空"),
    country: zod_1.z.string().optional(),
});
exports.OutreachMessageSchema = zod_1.z.object({
    channel: zod_1.z.enum(["email", "linkedin", "whatsapp"]),
    language: zod_1.z.string(),
    content: zod_1.z.string().min(5),
});
exports.ThirdPartyMessageSchema = zod_1.z.object({
    channel: zod_1.z.enum(["email", "linkedin", "whatsapp", "crm"]),
    direction: zod_1.z.enum(["inbound", "outbound"]),
    content: zod_1.z.string().min(1),
});
