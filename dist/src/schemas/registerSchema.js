"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().label("Digite um email válido"),
    password: joi_1.default.string().min(1).required().label("Digite uma senha válida"),
    passwordConfirm: joi_1.default
        .string()
        .min(1)
        .required()
        .label("Digite uma senha válida"),
});
