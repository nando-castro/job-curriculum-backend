import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import client from "../../src/databases/database";

async function registerUser() {
  const passwordFaker = faker.internet.password();

  return {
    email: faker.internet.email(),
    password: passwordFaker,
    passwordConfirm: passwordFaker,
  };
}

async function createLogin(email: string, password: string) {
  const user = await client.user.findUnique({ where: { email } });
  return { ...user, password: password };
}

const userFactory = {
  registerUser,
  createLogin,
};

export default userFactory;
