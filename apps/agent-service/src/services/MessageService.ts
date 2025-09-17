/**
 * src/services/MessageService.ts
 *
 * 第三方消息（Email / WhatsApp / LinkedIn / CRM）
 */
import { prisma } from "../db/prisma";
import { ThirdPartyMessage } from "@foreign-trade-assistant/dto";

export class MessageService {
  /**
   * 获取某公司的所有消息
   */
  static async getMessages(companyId: string): Promise<ThirdPartyMessage[]> {
    const msgs = await prisma.thirdPartyMessage.findMany({
      where: { companyId },
    });
    return msgs as ThirdPartyMessage[];
  }

  /**
   * 新增一条消息
   */
  static async addMessage(
    companyId: string,
    msg: ThirdPartyMessage
  ): Promise<ThirdPartyMessage> {
    const newMsg = await prisma.thirdPartyMessage.create({
      data: { ...msg, companyId },
    });
    return newMsg as ThirdPartyMessage;
  }
}
