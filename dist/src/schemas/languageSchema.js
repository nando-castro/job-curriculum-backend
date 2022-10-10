"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.languageSchema = joi_1.default.object({
    language: joi_1.default.string().required(),
    personalDataId: joi_1.default.number().required(),
});
