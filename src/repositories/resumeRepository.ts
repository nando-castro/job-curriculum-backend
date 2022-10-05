import { TypePersonalDataData } from "./../types/PersonalDataTypes";
import client from "../databases/database";

export async function insert(data: TypePersonalDataData) {
  const rows = await client.personalData.create({
    data: {
      title: data.title,
      firstName: data.firstName,
      lastName: data.lastName,
      picture: data.picture,
      email: data.email,
      numberPhone: data.numberPhone,
      address: data.address,
      postalCode: data.postalCode,
      city: data.city,
      office: data.office,
      birthday: data.birthday,
      linkedin: data.linkedin,
      userId: data.userId,
      typeDriverLicense: data.typeDriverLicense,
    },
  });
  return rows;
}

export async function getById(userId: number) {
  const rows = await client.personalData.findMany({
    where: { userId },
  });
  return rows;
}

export async function findbyTitle(userId: number, title: string) {
  const rows = await client.personalData.findFirst({
    where: { userId, title },
  });
  return rows;
}
