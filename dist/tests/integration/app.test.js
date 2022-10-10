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
const src_1 = __importDefault(require("../../src"));
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../../src/databases/database"));
const userFactory_1 = __importDefault(require("../factories/userFactory"));
const scenarioFactory_1 = __importDefault(require("../factories/scenarioFactory"));
const personalDataFactory_1 = __importDefault(require("../factories/personalDataFactory"));
const formationFactory_1 = __importDefault(require("../factories/formationFactory"));
const experienceFactory_1 = __importDefault(require("../factories/experienceFactory"));
const skillFactory_1 = __importDefault(require("../factories/skillFactory"));
const languageFactory_1 = __importDefault(require("../factories/languageFactory"));
let token;
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    scenarioFactory_1.default.deleteAllData();
}));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.$disconnect();
}));
describe("Testa a rota POST /signup", () => {
    it("Deve retornar 201, se cadastrado um usuario no formato correto", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        const result = yield (0, supertest_1.default)(src_1.default).post(`/signup`).send(userRegister);
        const createUser = yield database_1.default.user.findUnique({
            where: { email: userRegister.email },
        });
        expect(result.status).toBe(201);
        expect(createUser).not.toBeNull();
    }));
    it("Deve retornar 409, ao tentar cadastrar um email que ja exista", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(src_1.default).post(`/signup`).send(userRegister);
        const result = yield (0, supertest_1.default)(src_1.default).post(`/signup`).send(userRegister);
        expect(result.status).toBe(409);
    }));
    it("Deve retornar 422, ao tentar cadastrar um email com senhas distintas", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        const userDataRegister = Object.assign(Object.assign({}, userRegister), { passwordConfirm: "test123" });
        const result = yield (0, supertest_1.default)(src_1.default).post(`/signup`).send(userDataRegister);
        expect(result.status).toBe(422);
    }));
});
describe("Testa a rota POST /signin", () => {
    it("Deve retornar 200, se usuario logado corretamente e retorna um token", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(src_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const result = yield (0, supertest_1.default)(src_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = result.body.token;
        expect(result.status).toBe(200);
        expect(token).not.toBeNull();
    }));
    it("Deve retornar 404, se usuario nao existir", () => __awaiter(void 0, void 0, void 0, function* () {
        const userLogin = {
            email: "test@test.com",
            password: "1234",
        };
        const result = yield (0, supertest_1.default)(src_1.default).post(`/signin`).send(userLogin);
        expect(result.status).toBe(404);
    }));
    it("Deve retornar 422, se usuario digitar email ou senha incorretos", () => __awaiter(void 0, void 0, void 0, function* () {
        const userLogin = {
            email: "testtest.com",
            password: "12345",
        };
        const result = yield (0, supertest_1.default)(src_1.default).post(`/signin`).send(userLogin);
        expect(result.status).toBe(422);
    }));
});
describe("Testa a rota POST /resume/create", () => {
    it("Deve retornar 201, se usuario criar um curriculo", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(src_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const result = yield (0, supertest_1.default)(src_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = result.body.token;
        const personalData = yield personalDataFactory_1.default.registerPersonalData();
        const response = yield (0, supertest_1.default)(src_1.default)
            .post("/resume/create")
            .set({ Authorization: token })
            .send(personalData);
        expect(response.status).toBe(201);
    }));
    it("Deve retornar 422, se alguma informacao estiver mal formatada ou errada", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(src_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const result = yield (0, supertest_1.default)(src_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = result.body.token;
        const personalData = {};
        const response = yield (0, supertest_1.default)(src_1.default)
            .post("/resume/create")
            .set({ Authorization: token })
            .send(personalData);
        expect(response.status).toBe(422);
    }));
    it("Deve retornar 401, se token ou usuario invalido", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(src_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        yield (0, supertest_1.default)(src_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        const personalData = {};
        const response = yield (0, supertest_1.default)(src_1.default)
            .post("/resume/create")
            .send(personalData);
        expect(response.status).toBe(401);
    }));
});
describe("Testa a rota POST /formation/create", () => {
    it("Deve retornar 201, se usuario adicionar uma formacao ao curriculo", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(src_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const result = yield (0, supertest_1.default)(src_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = result.body.token;
        const personalData = yield personalDataFactory_1.default.registerPersonalData();
        const resultResume = yield (0, supertest_1.default)(src_1.default)
            .post("/resume/create")
            .set({ Authorization: token })
            .send(personalData);
        const formation = yield formationFactory_1.default.registerFormation();
        const formationData = Object.assign(Object.assign({}, formation), { personalDataId: resultResume.body.idResume });
        const response = yield (0, supertest_1.default)(src_1.default)
            .post("/formation/create")
            .set({ Authorization: token })
            .send(formationData);
        expect(response.status).toBe(201);
    }));
    it("Deve retornar 422, se usuario adicionar uma formacao com com algum dado incorreto ao curriculo", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(src_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const result = yield (0, supertest_1.default)(src_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = result.body.token;
        const formation = {};
        const response = yield (0, supertest_1.default)(src_1.default)
            .post("/formation/create")
            .set({ Authorization: token })
            .send(formation);
        expect(response.status).toBe(422);
    }));
    it("Deve retornar 401, se usuario invalido tentar adicionar uma formacao ao curriculo", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(src_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const result = yield (0, supertest_1.default)(src_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = result.body.token;
        const personalData = yield personalDataFactory_1.default.registerPersonalData();
        const resultResume = yield (0, supertest_1.default)(src_1.default)
            .post("/resume/create")
            .set({ Authorization: token })
            .send(personalData);
        const formation = yield formationFactory_1.default.registerFormation();
        const formationData = Object.assign(Object.assign({}, formation), { personalDataId: resultResume.body.idResume });
        const response = yield (0, supertest_1.default)(src_1.default)
            .post("/formation/create")
            .send(formationData);
        expect(response.status).toBe(401);
    }));
});
describe("Testa a rota POST /experience/create", () => {
    it("Deve retornar 201, se usuario adicionar uma experiencia ao curriculo", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(src_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const result = yield (0, supertest_1.default)(src_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = result.body.token;
        const personalData = yield personalDataFactory_1.default.registerPersonalData();
        const resultResume = yield (0, supertest_1.default)(src_1.default)
            .post("/resume/create")
            .set({ Authorization: token })
            .send(personalData);
        const experience = yield experienceFactory_1.default.registerExperience();
        const experienceData = Object.assign(Object.assign({}, experience), { personalDataId: resultResume.body.idResume });
        const response = yield (0, supertest_1.default)(src_1.default)
            .post("/experience/create")
            .set({ Authorization: token })
            .send(experienceData);
        expect(response.status).toBe(201);
    }));
    it("Deve retornar 422, se usuario adicionar uma experiencia com com algum dado incorreto ao curriculo", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(src_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const result = yield (0, supertest_1.default)(src_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = result.body.token;
        const experience = {};
        const response = yield (0, supertest_1.default)(src_1.default)
            .post("/experience/create")
            .set({ Authorization: token })
            .send(experience);
        expect(response.status).toBe(422);
    }));
    it("Deve retornar 401, se usuario invalido tentar adicionar uma experiencia ao curriculo", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(src_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const result = yield (0, supertest_1.default)(src_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = result.body.token;
        const personalData = yield personalDataFactory_1.default.registerPersonalData();
        const resultResume = yield (0, supertest_1.default)(src_1.default)
            .post("/resume/create")
            .set({ Authorization: token })
            .send(personalData);
        const experience = yield formationFactory_1.default.registerFormation();
        const experienceData = Object.assign(Object.assign({}, experience), { personalDataId: resultResume.body.idResume });
        const response = yield (0, supertest_1.default)(src_1.default)
            .post("/experience/create")
            .send(experienceData);
        expect(response.status).toBe(401);
    }));
});
describe("Testa a rota POST /skill/create", () => {
    it("Deve retornar 201, se usuario adicionar uma habilidade ao curriculo", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(src_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const result = yield (0, supertest_1.default)(src_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = result.body.token;
        const personalData = yield personalDataFactory_1.default.registerPersonalData();
        const resultResume = yield (0, supertest_1.default)(src_1.default)
            .post("/resume/create")
            .set({ Authorization: token })
            .send(personalData);
        const skill = yield skillFactory_1.default.registerSkill();
        const skillData = Object.assign(Object.assign({}, skill), { personalDataId: resultResume.body.idResume });
        const response = yield (0, supertest_1.default)(src_1.default)
            .post("/skill/create")
            .set({ Authorization: token })
            .send(skillData);
        expect(response.status).toBe(201);
    }));
    it("Deve retornar 422, se usuario adicionar uma habilidade com com algum dado incorreto ao curriculo", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(src_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const result = yield (0, supertest_1.default)(src_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = result.body.token;
        const skill = {};
        const response = yield (0, supertest_1.default)(src_1.default)
            .post("/skill/create")
            .set({ Authorization: token })
            .send(skill);
        expect(response.status).toBe(422);
    }));
    it("Deve retornar 401, se usuario invalido tentar adicionar uma habilidade ao curriculo", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(src_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const result = yield (0, supertest_1.default)(src_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = result.body.token;
        const personalData = yield personalDataFactory_1.default.registerPersonalData();
        const resultResume = yield (0, supertest_1.default)(src_1.default)
            .post("/resume/create")
            .set({ Authorization: token })
            .send(personalData);
        const skill = yield skillFactory_1.default.registerSkill();
        const skillData = Object.assign(Object.assign({}, skill), { personalDataId: resultResume.body.idResume });
        const response = yield (0, supertest_1.default)(src_1.default).post("/skill/create").send(skillData);
        expect(response.status).toBe(401);
    }));
});
describe("Testa a rota POST /language/create", () => {
    it("Deve retornar 201, se usuario adicionar um idioma ao curriculo", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(src_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const result = yield (0, supertest_1.default)(src_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = result.body.token;
        const personalData = yield personalDataFactory_1.default.registerPersonalData();
        const resultResume = yield (0, supertest_1.default)(src_1.default)
            .post("/resume/create")
            .set({ Authorization: token })
            .send(personalData);
        const language = yield languageFactory_1.default.registerLanguage();
        const languageData = Object.assign(Object.assign({}, language), { personalDataId: resultResume.body.idResume });
        const response = yield (0, supertest_1.default)(src_1.default)
            .post("/language/create")
            .set({ Authorization: token })
            .send(languageData);
        expect(response.status).toBe(201);
    }));
    it("Deve retornar 422, se usuario adicionar um idioma com com algum dado incorreto ao curriculo", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(src_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const result = yield (0, supertest_1.default)(src_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = result.body.token;
        const language = {};
        const response = yield (0, supertest_1.default)(src_1.default)
            .post("/language/create")
            .set({ Authorization: token })
            .send(language);
        expect(response.status).toBe(422);
    }));
    it("Deve retornar 401, se usuario invalido tentar adicionar um idioma ao curriculo", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(src_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const result = yield (0, supertest_1.default)(src_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = result.body.token;
        const personalData = yield personalDataFactory_1.default.registerPersonalData();
        const resultResume = yield (0, supertest_1.default)(src_1.default)
            .post("/resume/create")
            .set({ Authorization: token })
            .send(personalData);
        const language = yield languageFactory_1.default.registerLanguage();
        const languageData = Object.assign(Object.assign({}, language), { personalDataId: resultResume.body.idResume });
        const response = yield (0, supertest_1.default)(src_1.default)
            .post("/language/create")
            .send(languageData);
        expect(response.status).toBe(401);
    }));
});
