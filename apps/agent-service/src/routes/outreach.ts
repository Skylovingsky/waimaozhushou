/**
 * src/routes/outreach.ts
 *
 * 外联话术相关 API
 */
import { FastifyInstance } from "fastify";
import { OutreachService } from "../services/OutreachService";

export default async function outreachRoutes(app: FastifyInstance) {
  // 获取某公司的外联话术
  app.get("/:companyId", async (request, reply) => {
    const { companyId } = request.params as { companyId: string };
    const messages = await OutreachService.getMessages(companyId);
    return messages;
  });

  // 新增外联话术
  app.post("/:companyId", async (request, reply) => {
    const { companyId } = request.params as { companyId: string };
    const { channel, language, content } = request.body as any;
    const newMsg = await OutreachService.addMessage(companyId, {
      channel,
      language,
      content,
    });
    return newMsg;
  });
}
