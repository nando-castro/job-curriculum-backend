"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResume = exports.updateResume = exports.getResumes = exports.getResume = exports.createResume = void 0;
const errorUtils_1 = require("./../utils/errorUtils");
const resumeRepository = __importStar(require("../repositories/resumeRepository"));
const skillRepository = __importStar(require("../repositories/skillRepository"));
const languageRepository = __importStar(require("../repositories/languageRepository"));
const formationRepository = __importStar(require("../repositories/formationRepository"));
const experienceRepository = __importStar(require("../repositories/experienceRepository"));
const errorUtils_2 = require("../utils/errorUtils");
function createResume(userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const resumeTitleExists = yield resumeRepository.findbyTitle(userId, data.title);
        if (resumeTitleExists)
            throw (0, errorUtils_2.conflictError)(`Title exists`);
        const dataResume = Object.assign(Object.assign({}, data), { userId });
        const { id } = yield resumeRepository.insert(dataResume);
        return id;
    });
}
exports.createResume = createResume;
function getResume(resumeId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const resume = yield resumeRepository.findResumeById(resumeId, userId);
        if (resume.length === 0)
            throw (0, errorUtils_1.unauthorizedError)(`Not authorized`);
        return resume;
    });
}
exports.getResume = getResume;
function getResumes(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const resume = yield resumeRepository.findByUserId(userId);
        return resume;
    });
}
exports.getResumes = getResumes;
function updateResume(resumeId, userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const resumeTitleExists = yield resumeRepository.findbyTitle(userId, data.title);
        if (resumeTitleExists)
            throw (0, errorUtils_2.conflictError)(`Title exists`);
        yield resumeRepository.update(resumeId, data);
    });
}
exports.updateResume = updateResume;
function deleteResume(resumeId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield skillRepository.deleteById(resumeId);
        yield languageRepository.deleteById(resumeId);
        yield formationRepository.deleteById(resumeId);
        yield experienceRepository.deleteById(resumeId);
        yield resumeRepository.deleteById(resumeId);
    });
}
exports.deleteResume = deleteResume;
