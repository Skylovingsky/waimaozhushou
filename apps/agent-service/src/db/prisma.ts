/**
 * src/db/prisma.ts
 *
 * Prisma 客户端封装
 * - 统一连接数据库
 * - 提供给 Service 层使用
 */
import { PrismaClient } from "@prisma/client";
import { config } from "../config/env";
import { logger } from "../utils/logger";

export const prisma = new PrismaClient({
  datasources: {
    db: { url: config.DATABASE_URL },
  },
});

// 优雅退出
process.on("beforeExit", async () => {
  logger.info("🔌 Disconnecting Prisma...");
  await prisma.$disconnect();
});
