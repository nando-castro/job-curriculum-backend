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
function registerExperience() {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            occupation: faker_1.faker.lorem.words(1),
            company: faker_1.faker.lorem.word(2),
            city: faker_1.faker.address.city(),
            monthStart: "01",
            yearStart: "2012",
            monthEnd: "30",
            yearEnd: "2022",
            description: faker_1.faker.lorem.paragraph(1),
        };
    });
}
const experienceFactory = {
    registerExperience,
};
exports.default = experienceFactory;
