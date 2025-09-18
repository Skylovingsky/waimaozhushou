/**
 * src/services/CompanyService.ts
 *
 * 公司调研相关逻辑
 * - 调用 CompanyAgent
 * - 存取数据库
 */
import { prisma } from "../db/prisma";
import { CompanyAgent } from "../agents/CompanyAgent";
import { CompanyProfile } from "@foreign-trade-assistant/dto/src/company";
import { randomUUID } from "node:crypto";

export class CompanyService {
  /**
   * 分析公司 (Excel 上传 → AI 调研 → 存数据库)
   */
  static async analyze(fileBuffer: Buffer): Promise<CompanyProfile[]> {
    // TODO: 解析 Excel → 拿到公司名列表
    const companyNames = ["Siemens", "Bosch"]; // mock

    const results: CompanyProfile[] = [];
    for (const name of companyNames) {
      const { profile } = await CompanyAgent.run(name);
      results.push(profile);

      // 存入数据库
      await prisma.company.create({
        data: {
          id: randomUUID(),
          name: profile.company_name,
          country: profile.country,
          summary: profile.summary,
          overallScore: profile.final_judgment.overall_score,
          recommendation: profile.final_judgment.recommendation,
        },
      });
    }

    return results;
  }

  /**
   * 获取公司档案
   */
  static async getProfile(id: string): Promise<CompanyProfile | null> {
    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        evidencePages: true,
        outreachMessages: true,
        thirdPartyMessages: true,
      },
    });

    return company as unknown as CompanyProfile;
  }
}
