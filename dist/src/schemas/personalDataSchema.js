"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personalDataSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.personalDataSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().label("Digite um email válido"),
    title: joi_1.default.string().required().label("Digite um titulo"),
    firstName: joi_1.default.string().required().label("Digite um nome"),
    lastName: joi_1.default.string().required().label("digite um sobrenome"),
    picture: joi_1.default.string().required().label("Formato da imagem incorreto"),
    numberPhone: joi_1.default.string().required().label("Número incorreto"),
    address: joi_1.default.string().required().label("Digite um endereco valido"),
    postalCode: joi_1.default.string().required().label("Código Postal incorreto"),
    city: joi_1.default.string().required(),
    office: joi_1.default.string().required(),
    birthday: joi_1.default.string().label("formato da data incorreto"),
    linkedin: joi_1.default.string(),
    typeDriverLicense: joi_1.default.string().valid("A", "B", "AB", "C", "D", "E"),
});
