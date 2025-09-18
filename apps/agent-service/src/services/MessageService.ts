/**
 * src/services/MessageService.ts
 *
 * 第三方消息（Email / WhatsApp / LinkedIn / CRM）相关逻辑
 */
import { prisma } from "../db/prisma";
import { ThirdPartyMessage } from "@foreign-trade-assistant/dto/src/message";

export class MessageService {
  /**
   * 获取某公司的所有第三方消息
   */
  static async getMessages(companyId: string): Promise<ThirdPartyMessage[]> {
    const messages = await prisma.thirdPartyMessage.findMany({
      where: { companyId },
      orderBy: { timestamp: "desc" },
    });
    return messages as unknown as ThirdPartyMessage[];
  }

  /**
   * 新增一条第三方消息
   */
  static async addMessage(
    companyId: string,
    message: ThirdPartyMessage
  ): Promise<ThirdPartyMessage> {
    const created = await prisma.thirdPartyMessage.create({
      data: { ...message, companyId },
    });
    return created as unknown as ThirdPartyMessage;
  }
}
