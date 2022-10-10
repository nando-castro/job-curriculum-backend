"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.skillSchema = joi_1.default.object({
    skill: joi_1.default.string().required(),
    personalDataId: joi_1.default.number().required(),
});
