/**
 * src/utils/logger.ts
 *
 * 简单日志工具
 * - 封装 console
 * - 按级别打印
 */
import pino from "pino";
import { config } from "../config/env";

export const logger = pino({
  level: config.LOG_LEVEL || "info",
  transport:
    config.NODE_ENV === "development"
      ? { target: "pino-pretty", options: { colorize: true } }
      : undefined,
});
