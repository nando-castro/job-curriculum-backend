import { faker } from "@faker-js/faker";

async function registerPersonalData() {
  return {
    title: faker.lorem.words(2),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    picture: faker.image.imageUrl(),
    email: faker.internet.email(),
    numberPhone: "933221100",
    address: faker.address.street(),
    postalCode: "32444000",
    city: faker.address.city(),
    office: faker.lorem.words(2),
  };
}

const personalDataFactory = {
  registerPersonalData,
};

export default personalDataFactory;
