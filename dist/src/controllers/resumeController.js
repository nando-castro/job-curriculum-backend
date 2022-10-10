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
exports.updateResume = exports.getResumes = exports.getResume = exports.createResume = void 0;
const resumeService = __importStar(require("../services/resumeService"));
function createResume(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataResume = req.body;
        const { id } = res.locals.user;
        const idResume = yield resumeService.createResume(id, dataResume);
        res.status(201).send({ idResume });
    });
}
exports.createResume = createResume;
function getResume(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { resumeId } = req.params;
        const { id } = res.locals.user;
        const result = yield resumeService.getResume(id, Number(resumeId));
        res.status(200).send(result);
    });
}
exports.getResume = getResume;
function getResumes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = res.locals.user;
        const result = yield resumeService.getResumes(id);
        res.status(200).send(result);
    });
}
exports.getResumes = getResumes;
function updateResume(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const { resumeId } = req.params;
        const { id } = res.locals.user;
        yield resumeService.updateResume(Number(resumeId), id, data);
        res.sendStatus(200);
    });
}
exports.updateResume = updateResume;
