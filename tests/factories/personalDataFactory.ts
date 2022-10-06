import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import client from "../../src/databases/database";

async function registerPersonalData() {
  return {
    title: "Curriculo Teste",
    firstName: "Fernando",
    lastName: "Castro Sousa",
    picture:
      "http://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png",
    email: "dev@dev.com",
    numberPhone: "98955443322",
    address: "Rua 9 casa 5",
    postalCode: "65110000",
    city: "Sao Luis",
    office: "teste",
  };
  // return {
  //   title: faker.lorem.words(2),
  //   firstName: faker.name.firstName(),
  //   lastName: faker.name.lastName(),
  //   picture: faker.image.imageUrl(),
  //   email: faker.internet.email(),
  //   numberPhone: "98933221100",
  //   address: faker.address.street(),
  //   postalCode: "65110000",
  //   city: faker.address.city(),
  //   office: faker.lorem.words(2),
  // };
}

const personalDataFactory = {
  registerPersonalData,
};

export default personalDataFactory;
