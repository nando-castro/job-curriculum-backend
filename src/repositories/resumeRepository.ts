import { TypePersonalDataData } from "./../types/PersonalDataTypes";
import client from "../databases/database";

export async function insert(data: TypePersonalDataData) {
  await client.personalData.create({
    data: {
      title: data.title,
      firstName: data.firstName,
      lastName: data.lastName,
      imageUser: data.imageUser,
      email: data.email,
      numberPhone: data.numberPhone,
      postalCode: data.postalCode,
      city: data.city,
      birthday: data.birthday,
      linkedin: data.linkedin,
      userId: data.userId,
      typeDriverLicense: data.typeDriverLicense,
    },
  });
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
