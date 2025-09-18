"use strict";
/**
 * src/agents/CompanyAgent.ts
 *
 * AI Agent：
 * - 输入：公司名
 * - 输出：公司调研报告 (CompanyProfile) + 外联话术 (OutreachMessage[])
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyAgent = void 0;
var aiClient_1 = require("../utils/aiClient");
var CompanyAgent = /** @class */ (function () {
    function CompanyAgent() {
    }
    /**
     * 调用 Qwen，获取公司调研结果
     */
    CompanyAgent.run = function (companyName) {
        return __awaiter(this, void 0, void 0, function () {
            var prompt, result, parsed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prompt = "\n\u4F60\u662F\u4E00\u540D\u8D44\u6DF1\u5916\u8D38\u4E1A\u52A1\u5458\uFF0C\u8BF7\u5BF9\u4EE5\u4E0B\u516C\u53F8\u8FDB\u884C\u5168\u9762\u8C03\u7814\uFF1A\n\n\u516C\u53F8\u540D\u79F0: ".concat(companyName, "\n\n\u8BF7\u6267\u884C\u4EE5\u4E0B\u4EFB\u52A1\uFF1A\n1. \u8054\u7F51\u641C\u7D22\u8BE5\u516C\u53F8\uFF08\u81F3\u5C11\u8FD4\u56DE5\u4E2A\u4E0D\u540C\u7684\u7F51\u9875\u4F5C\u4E3A\u8BC1\u636E\uFF09\u3002\n2. \u7EFC\u5408\u5206\u6790\u516C\u53F8\u60C5\u51B5\uFF0C\u4ECE\u4EE5\u4E0B5\u4E2A\u7EF4\u5EA6\u7ED9\u51FA\u5224\u65AD\uFF1A\n   - \u771F\u5B9E\u6027 (authenticity)\uFF1A\u662F\u5426\u662F\u771F\u5B9E\u5B58\u5728\u7684\u516C\u53F8\uFF1F\n   - \u4EA7\u54C1\u5951\u5408\u5EA6 (product_fit)\uFF1A\u5176\u4EA7\u54C1\u662F\u5426\u9002\u5408\u4E0E\u6211\u4EEC\u5408\u4F5C\uFF1F\n   - \u53EF\u9760\u6027 (reliability)\uFF1A\u516C\u53F8\u4FE1\u8A89\u3001\u5386\u53F2\u3001\u5BA2\u6237\u8BC4\u4EF7\u5982\u4F55\uFF1F\n   - \u5E02\u573A\u5730\u4F4D (market_position)\uFF1A\u5728\u884C\u4E1A\u4E2D\u7684\u4F4D\u7F6E\u548C\u7ADE\u4E89\u529B\u5982\u4F55\uFF1F\n   - \u98CE\u9669\u4E0E\u673A\u4F1A (risk_opportunity)\uFF1A\u6F5C\u5728\u7684\u98CE\u9669\u70B9\u4E0E\u5408\u4F5C\u673A\u4F1A\u3002\n3. \u63D0\u70BC\u516C\u53F8\u603B\u7ED3 (summary)\uFF0C\u5E76\u5217\u51FA\u4E3B\u8981\u4EA7\u54C1 (products)\u3002\n4. \u63D0\u53D6\u8054\u7CFB\u65B9\u5F0F (email / phone / website / LinkedIn)\u3002\n5. \u6700\u7EC8\u7ED9\u51FA\u4E00\u4E2A\u7EFC\u5408\u5224\u65AD (final_judgment)\uFF1A\u662F\u5426\u9002\u5408\u5408\u4F5C\uFF0C\u5E76\u7ED9\u51FA\u5206\u6570 (0-100) \u4E0E\u539F\u56E0\u3002\n6. \u751F\u6210\u591A\u8BED\u8A00\u5916\u8054\u8BDD\u672F (OutreachMessage)\uFF0C\u81F3\u5C11\u5305\u542B\uFF1A\n   - \u4E00\u5C01\u82F1\u6587 Email\n   - \u4E00\u6761 LinkedIn \u79C1\u4FE1\n   - \u4E00\u6761 WhatsApp \u6D88\u606F\n\n\u8F93\u51FA\u683C\u5F0F\u5FC5\u987B\u662F JSON\uFF0C\u4E25\u683C\u7B26\u5408\u4EE5\u4E0B\u7ED3\u6784\uFF1A\n{\n  \"profile\": {\n    \"company_name\": \"...\",\n    \"summary\": \"...\",\n    \"products\": [\"...\"],\n    \"contacts\": {\n      \"email\": \"...\",\n      \"phone\": \"...\",\n      \"website\": \"...\",\n      \"linkedin\": \"...\"\n    },\n    \"country\": \"...\",\n    \"evidence_pages\": [\n      { \"url\": \"...\", \"snippet\": \"...\" },\n      { \"url\": \"...\", \"snippet\": \"...\" }\n    ],\n    \"analysis\": {\n      \"authenticity\": { \"status\": \"...\", \"evidence\": [\"...\"], \"score\": 90 },\n      \"product_fit\": { \"status\": \"...\", \"evidence\": [\"...\"], \"score\": 80 },\n      \"reliability\": { \"status\": \"...\", \"evidence\": [\"...\"], \"score\": 85 },\n      \"market_position\": { \"status\": \"...\", \"evidence\": [\"...\"], \"score\": 88 },\n      \"risk_opportunity\": { \"risks\": [\"...\"], \"opportunities\": [\"...\"], \"evidence\": [\"...\"] }\n    },\n    \"final_judgment\": {\n      \"recommendation\": \"\u9002\u5408\u5408\u4F5C\",\n      \"overall_score\": 87,\n      \"reason\": \"\u516C\u53F8\u89C4\u6A21\u5927\uFF0C\u4FE1\u8A89\u597D\"\n    }\n  },\n  \"outreach\": [\n    { \"channel\": \"email\", \"language\": \"en\", \"content\": \"...\" },\n    { \"channel\": \"linkedin\", \"language\": \"en\", \"content\": \"...\" },\n    { \"channel\": \"whatsapp\", \"language\": \"en\", \"content\": \"...\" }\n  ]\n}\n");
                        return [4 /*yield*/, (0, aiClient_1.callQwen)(prompt)];
                    case 1:
                        result = _a.sent();
                        try {
                            parsed = JSON.parse(result.output || result);
                            return [2 /*return*/, parsed];
                        }
                        catch (err) {
                            throw new Error("❌ Qwen 返回结果解析失败: " + err);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return CompanyAgent;
}());
exports.CompanyAgent = CompanyAgent;
