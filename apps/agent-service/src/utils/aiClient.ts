/**
 * src/utils/aiClient.ts
 *
 * 调用 Qwen API 的封装
 */
import axios from "axios";
import { config } from "../config/env";

interface QwenRequest {
  model: string;
  input: string;
}

export async function callQwen(prompt: string): Promise<any> {
  try {
    const res = await axios.post<QwenRequest>(
      config.QWEN_API_URL,
      {
        model: "qwen-plus", // 可以换成具体版本
        input: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${config.QWEN_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err: any) {
    console.error("调用 Qwen 失败:", err.response?.data || err.message);
    throw new Error("AI 调用失败");
  }
}
