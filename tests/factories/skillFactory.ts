import { faker } from "@faker-js/faker";

async function registerSkill() {
  return {
    skill: faker.lorem.words(1),
  };
}

const skillFactory = {
  registerSkill,
};

export default skillFactory;
