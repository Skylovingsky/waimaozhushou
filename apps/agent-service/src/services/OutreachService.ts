/**
 * src/services/OutreachService.ts
 *
 * 外联话术相关逻辑
 */
import { prisma } from "../db/prisma";
import { OutreachMessage } from "@foreign-trade-assistant/dto";

export class OutreachService {
  /**
   * 获取某公司的外联话术
   */
  static async getMessages(companyId: string): Promise<OutreachMessage[]> {
    const msgs = await prisma.outreachMessage.findMany({
      where: { companyId },
    });
    return msgs as OutreachMessage[];
  }

  /**
   * 新增一条外联话术
   */
  static async addMessage(
    companyId: string,
    msg: OutreachMessage
  ): Promise<OutreachMessage> {
    const newMsg = await prisma.outreachMessage.create({
      data: { ...msg, companyId },
    });
    return newMsg as OutreachMessage;
  }
}
