/**
 * src/routes/company.ts
 *
 * 公司调研相关 API
 */
import { FastifyInstance } from "fastify";
import { CompanyService } from "../services/CompanyService";

export default async function companyRoutes(app: FastifyInstance) {
  // 上传 Excel 并触发调研
  app.post("/analyze", async (request, reply) => {
    const { fileBuffer } = request.body as any; // TODO: 改成 file upload
    const result = await CompanyService.analyze(fileBuffer);
    return result;
  });

  // 获取公司档案
  app.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const profile = await CompanyService.getProfile(id);
    return profile;
  });
}
