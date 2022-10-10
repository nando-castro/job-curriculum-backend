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
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
function registerPersonalData() {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: faker_1.faker.lorem.words(2),
            firstName: faker_1.faker.name.firstName(),
            lastName: faker_1.faker.name.lastName(),
            picture: faker_1.faker.image.imageUrl(),
            email: faker_1.faker.internet.email(),
            numberPhone: "933221100",
            address: faker_1.faker.address.street(),
            postalCode: "32444000",
            city: faker_1.faker.address.city(),
            office: faker_1.faker.lorem.words(2),
        };
    });
}
const personalDataFactory = {
    registerPersonalData,
};
exports.default = personalDataFactory;
