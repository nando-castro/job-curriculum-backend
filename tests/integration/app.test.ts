import jwt from "jsonwebtoken";
import app from "../../src";
import supertest from "supertest";
import client from "../../src/databases/database";
import userFactory from "../factories/userFactory";
import scenarioFactory from "../factories/scenarioFactory";
import personalDataFactory from "../factories/personalDataFactory";
import formationFactory from "../factories/formationFactory";
import experienceFactory from "../factories/experienceFactory";
import skillFactory from "../factories/skillFactory";
import languageFactory from "../factories/languageFactory";

let token: string;

beforeEach(async () => {
  scenarioFactory.deleteAllData();
});

beforeAll(async () => {
  await client.$disconnect();
});

describe("Testa a rota POST /signup", () => {
  it("Deve retornar 201, se cadastrado um usuario no formato correto", async () => {
    const userRegister = await userFactory.registerUser();

    const result = await supertest(app).post(`/signup`).send(userRegister);

    const createUser = await client.user.findUnique({
      where: { email: userRegister.email },
    });

    expect(result.status).toBe(201);
    expect(createUser).not.toBeNull();
  });

  it("Deve retornar 409, ao tentar cadastrar um email que ja exista", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const result = await supertest(app).post(`/signup`).send(userRegister);

    expect(result.status).toBe(409);
  });
  it("Deve retornar 422, ao tentar cadastrar um email com senhas distintas", async () => {
    const userRegister = await userFactory.registerUser();
    const userDataRegister = { ...userRegister, passwordConfirm: "test123" };

    const result = await supertest(app).post(`/signup`).send(userDataRegister);

    expect(result.status).toBe(422);
  });
});

describe("Testa a rota POST /signin", () => {
  it("Deve retornar 200, se usuario logado corretamente e retorna um token", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const result = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = result.body.token;
    expect(result.status).toBe(200);
    expect(token).not.toBeNull();
  });
  it("Deve retornar 404, se usuario nao existir", async () => {
    const userLogin = {
      email: "test@test.com",
      password: "1234",
    };
    const result = await supertest(app).post(`/signin`).send(userLogin);
    expect(result.status).toBe(404);
  });
  it("Deve retornar 422, se usuario digitar email ou senha incorretos", async () => {
    const userLogin = {
      email: "testtest.com",
      password: "12345",
    };
    const result = await supertest(app).post(`/signin`).send(userLogin);
    expect(result.status).toBe(422);
  });
});
describe("Testa a rota POST /resume/create", () => {
  it("Deve retornar 201, se usuario criar um curriculo", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const result = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = result.body.token;

    const personalData = await personalDataFactory.registerPersonalData();

    const response = await supertest(app)
      .post("/resume/create")
      .set({ Authorization: token })
      .send(personalData);

    expect(response.status).toBe(201);
  });
  it("Deve retornar 422, se alguma informacao estiver mal formatada ou errada", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const result = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = result.body.token;

    const personalData = {};

    const response = await supertest(app)
      .post("/resume/create")
      .set({ Authorization: token })
      .send(personalData);

    expect(response.status).toBe(422);
  });
  it("Deve retornar 401, se token ou usuario invalido", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });

    const personalData = {};

    const response = await supertest(app)
      .post("/resume/create")
      .send(personalData);

    expect(response.status).toBe(401);
  });
});
describe("Testa a rota POST /formation/create", () => {
  it("Deve retornar 201, se usuario adicionar uma formacao ao curriculo", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const result = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = result.body.token;

    const personalData = await personalDataFactory.registerPersonalData();

    const resultResume = await supertest(app)
      .post("/resume/create")
      .set({ Authorization: token })
      .send(personalData);

    const formation = await formationFactory.registerFormation();

    const formationData = {
      ...formation,
      personalDataId: resultResume.body.idResume,
    };

    const response = await supertest(app)
      .post("/formation/create")
      .set({ Authorization: token })
      .send(formationData);

    expect(response.status).toBe(201);
  });

  it("Deve retornar 422, se usuario adicionar uma formacao com com algum dado incorreto ao curriculo", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const result = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = result.body.token;

    const formation = {};

    const response = await supertest(app)
      .post("/formation/create")
      .set({ Authorization: token })
      .send(formation);

    expect(response.status).toBe(422);
  });

  it("Deve retornar 401, se usuario invalido tentar adicionar uma formacao ao curriculo", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const result = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = result.body.token;

    const personalData = await personalDataFactory.registerPersonalData();

    const resultResume = await supertest(app)
      .post("/resume/create")
      .set({ Authorization: token })
      .send(personalData);

    const formation = await formationFactory.registerFormation();

    const formationData = {
      ...formation,
      personalDataId: resultResume.body.idResume,
    };

    const response = await supertest(app)
      .post("/formation/create")
      .send(formationData);

    expect(response.status).toBe(401);
  });
});

describe("Testa a rota POST /experience/create", () => {
  it("Deve retornar 201, se usuario adicionar uma experiencia ao curriculo", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const result = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = result.body.token;

    const personalData = await personalDataFactory.registerPersonalData();

    const resultResume = await supertest(app)
      .post("/resume/create")
      .set({ Authorization: token })
      .send(personalData);

    const experience = await experienceFactory.registerExperience();

    const experienceData = {
      ...experience,
      personalDataId: resultResume.body.idResume,
    };

    const response = await supertest(app)
      .post("/experience/create")
      .set({ Authorization: token })
      .send(experienceData);

    expect(response.status).toBe(201);
  });

  it("Deve retornar 422, se usuario adicionar uma experiencia com com algum dado incorreto ao curriculo", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const result = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = result.body.token;

    const experience = {};

    const response = await supertest(app)
      .post("/experience/create")
      .set({ Authorization: token })
      .send(experience);

    expect(response.status).toBe(422);
  });

  it("Deve retornar 401, se usuario invalido tentar adicionar uma experiencia ao curriculo", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const result = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = result.body.token;

    const personalData = await personalDataFactory.registerPersonalData();

    const resultResume = await supertest(app)
      .post("/resume/create")
      .set({ Authorization: token })
      .send(personalData);

    const experience = await formationFactory.registerFormation();

    const experienceData = {
      ...experience,
      personalDataId: resultResume.body.idResume,
    };

    const response = await supertest(app)
      .post("/experience/create")
      .send(experienceData);

    expect(response.status).toBe(401);
  });
});
describe("Testa a rota POST /skill/create", () => {
  it("Deve retornar 201, se usuario adicionar uma habilidade ao curriculo", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const result = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = result.body.token;

    const personalData = await personalDataFactory.registerPersonalData();

    const resultResume = await supertest(app)
      .post("/resume/create")
      .set({ Authorization: token })
      .send(personalData);

    const skill = await skillFactory.registerSkill();

    const skillData = {
      ...skill,
      personalDataId: resultResume.body.idResume,
    };

    const response = await supertest(app)
      .post("/skill/create")
      .set({ Authorization: token })
      .send(skillData);

    expect(response.status).toBe(201);
  });

  it("Deve retornar 422, se usuario adicionar uma habilidade com com algum dado incorreto ao curriculo", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const result = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = result.body.token;

    const skill = {};

    const response = await supertest(app)
      .post("/skill/create")
      .set({ Authorization: token })
      .send(skill);

    expect(response.status).toBe(422);
  });

  it("Deve retornar 401, se usuario invalido tentar adicionar uma habilidade ao curriculo", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const result = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = result.body.token;

    const personalData = await personalDataFactory.registerPersonalData();

    const resultResume = await supertest(app)
      .post("/resume/create")
      .set({ Authorization: token })
      .send(personalData);

    const skill = await skillFactory.registerSkill();

    const skillData = {
      ...skill,
      personalDataId: resultResume.body.idResume,
    };

    const response = await supertest(app).post("/skill/create").send(skillData);

    expect(response.status).toBe(401);
  });
});
describe("Testa a rota POST /language/create", () => {
  it("Deve retornar 201, se usuario adicionar um idioma ao curriculo", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const result = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = result.body.token;

    const personalData = await personalDataFactory.registerPersonalData();

    const resultResume = await supertest(app)
      .post("/resume/create")
      .set({ Authorization: token })
      .send(personalData);

    const language = await languageFactory.registerLanguage();

    const languageData = {
      ...language,
      personalDataId: resultResume.body.idResume,
    };

    const response = await supertest(app)
      .post("/language/create")
      .set({ Authorization: token })
      .send(languageData);

    expect(response.status).toBe(201);
  });

  it("Deve retornar 422, se usuario adicionar um idioma com com algum dado incorreto ao curriculo", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const result = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = result.body.token;

    const language = {};

    const response = await supertest(app)
      .post("/language/create")
      .set({ Authorization: token })
      .send(language);

    expect(response.status).toBe(422);
  });

  it("Deve retornar 401, se usuario invalido tentar adicionar um idioma ao curriculo", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const result = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = result.body.token;

    const personalData = await personalDataFactory.registerPersonalData();

    const resultResume = await supertest(app)
      .post("/resume/create")
      .set({ Authorization: token })
      .send(personalData);

    const language = await languageFactory.registerLanguage();

    const languageData = {
      ...language,
      personalDataId: resultResume.body.idResume,
    };

    const response = await supertest(app)
      .post("/language/create")
      .send(languageData);

    expect(response.status).toBe(401);
  });
});
