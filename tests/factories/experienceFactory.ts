import { faker } from "@faker-js/faker";

async function registerExperience() {
  return {
    occupation: faker.lorem.words(1),
    company: faker.lorem.word(2),
    city: faker.address.city(),
    monthStart: "01",
    yearStart: "2012",
    monthEnd: "30",
    yearEnd: "2022",
    description: faker.lorem.paragraph(1),
  };
}

const experienceFactory = {
  registerExperience,
};

export default experienceFactory;
