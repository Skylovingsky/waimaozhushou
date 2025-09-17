/**
 * src/routes/message.ts
 *
 * 第三方消息 API (CRM / Email / LinkedIn / WhatsApp)
 */
import { FastifyInstance } from "fastify";
import { MessageService } from "../services/MessageService";

export default async function messageRoutes(app: FastifyInstance) {
  // 获取公司相关的第三方消息
  app.get("/:companyId", async (request, reply) => {
    const { companyId } = request.params as { companyId: string };
    const msgs = await MessageService.getMessages(companyId);
    return msgs;
  });

  // 新增一条第三方消息
  app.post("/:companyId", async (request, reply) => {
    const { companyId } = request.params as { companyId: string };
    const { channel, direction, content } = request.body as any;
    const newMsg = await MessageService.addMessage(companyId, {
      channel,
      direction,
      content,
    });
    return newMsg;
  });
}
