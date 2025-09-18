"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
/**
 * src/utils/logger.ts
 *
 * 简单日志工具
 * - 封装 console
 * - 按级别打印
 */
var pino_1 = require("pino");
var env_1 = require("../config/env");
exports.logger = (0, pino_1.default)({
    level: env_1.config.LOG_LEVEL || "info",
    transport: env_1.config.NODE_ENV === "development"
        ? { target: "pino-pretty", options: { colorize: true } }
        : undefined,
});
