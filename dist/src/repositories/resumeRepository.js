"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.update = exports.findbyTitle = exports.findResumeById = exports.findById = exports.findByUserId = exports.insert = void 0;
const database_1 = __importDefault(require("../databases/database"));
function insert(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.personalData.create({
            data: {
                title: data.title,
                firstName: data.firstName,
                lastName: data.lastName,
                picture: data.picture,
                email: data.email,
                numberPhone: data.numberPhone,
                address: data.address,
                postalCode: data.postalCode,
                city: data.city,
                office: data.office,
                birthday: data.birthday,
                linkedin: data.linkedin,
                userId: data.userId,
                typeDriverLicense: data.typeDriverLicense,
            },
        });
        return rows;
    });
}
exports.insert = insert;
function findByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.personalData.findMany({
            where: { userId },
        });
        return rows;
    });
}
exports.findByUserId = findByUserId;
function findById(resumeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.personalData.findUnique({
            where: { id: resumeId },
        });
        return rows;
    });
}
exports.findById = findById;
function findResumeById(userId, resumeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.personalData.findMany({
            where: { id: resumeId, userId },
        });
        return rows;
    });
}
exports.findResumeById = findResumeById;
function findbyTitle(userId, title) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.personalData.findFirst({
            where: { userId, title },
        });
        return rows;
    });
}
exports.findbyTitle = findbyTitle;
function update(resumeId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.personalData.update({
            where: { id: resumeId },
            data: {
                title: data.title,
                firstName: data.firstName,
                lastName: data.lastName,
                picture: data.picture,
                email: data.email,
                numberPhone: data.numberPhone,
                address: data.address,
                postalCode: data.postalCode,
                city: data.city,
                office: data.office,
                birthday: data.birthday,
                linkedin: data.linkedin,
                userId: data.userId,
                typeDriverLicense: data.typeDriverLicense,
            },
        });
        return rows;
    });
}
exports.update = update;
function deleteById(resumeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.personalData.delete({
            where: { id: resumeId },
        });
        return rows;
    });
}
exports.deleteById = deleteById;
