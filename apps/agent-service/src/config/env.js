"use strict";
/**
 * src/config/env.ts
 *
 * 极简环境变量配置
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: Number(process.env.PORT) || 3001,
    // 数据库
    DATABASE_URL: process.env.DATABASE_URL || "",
    // AI (Qwen)
    QWEN_API_KEY: process.env.QWEN_API_KEY || "",
    QWEN_API_URL: process.env.QWEN_API_URL ||
        "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
    // 日志
    LOG_LEVEL: process.env.LOG_LEVEL || "info",
};
