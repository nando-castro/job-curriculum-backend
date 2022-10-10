"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.formationSchema = joi_1.default.object({
    formation: joi_1.default.string().required(),
    institution: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    monthStart: joi_1.default.string().max(2).required(),
    yearStart: joi_1.default.string().max(4).required(),
    monthEnd: joi_1.default.string().max(2).required(),
    yearEnd: joi_1.default.string().max(4).required(),
    description: joi_1.default.string().required(),
    personalDataId: joi_1.default.number().required(),
});
