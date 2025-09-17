/**
 * src/routes/index.ts
 *
 * 汇总并注册所有路由
 */
import { FastifyInstance } from "fastify";

import companyRoutes from "./company";
import outreachRoutes from "./outreach";
import messageRoutes from "./message";

export async function registerRoutes(app: FastifyInstance) {
  app.register(companyRoutes, { prefix: "/company" });
  app.register(outreachRoutes, { prefix: "/outreach" });
  app.register(messageRoutes, { prefix: "/message" });
}
