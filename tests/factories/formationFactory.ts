import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import client from "../../src/databases/database";

async function registerFormation() {
  return {
    formation: faker.lorem.words(1),
    institution: faker.lorem.word(2),
    city: faker.address.city(),
    monthStart: "01",
    yearStart: "2012",
    monthEnd: "30",
    yearEnd: "2022",
    description: faker.lorem.paragraph(1),
    // personalDataId: 1,
  };
}

const formationFactory = {
  registerFormation,
};

export default formationFactory;
