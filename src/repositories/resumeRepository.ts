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

export async function findByUserId(userId: number) {
  const rows = await client.personalData.findMany({
    where: { userId },
  });
  return rows;
}

export async function findById(resumeId: number) {
  const rows = await client.personalData.findUnique({
    where: { id: resumeId },
  });
  return rows;
}

export async function findResumeById(userId: number, resumeId: number) {
  const rows = await client.personalData.findMany({
    where: { id: resumeId, userId },
  });
  return rows;
}

export async function findbyTitle(userId: number, title: string) {
  const rows = await client.personalData.findFirst({
    where: { userId, title },
  });
  return rows;
}

export async function update(resumeId: number, data: TypePersonalDataData) {
  const rows = await client.personalData.update({
    where: { id: resumeId },
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
