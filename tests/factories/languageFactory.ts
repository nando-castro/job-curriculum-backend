import { faker } from "@faker-js/faker";

async function registerLanguage() {
  return {
    language: faker.lorem.words(1),
  };
}

const languageFactory = {
  registerLanguage,
};

export default languageFactory;
