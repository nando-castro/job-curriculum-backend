import app from "../../src";
import supertest from "supertest";
import client from "../../src/databases/database";
import userFactory from "../factories/userFactory";

let token: string;

beforeEach(async () => {
  await client.$executeRaw`TRUNCATE TABLE "users"`;
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
