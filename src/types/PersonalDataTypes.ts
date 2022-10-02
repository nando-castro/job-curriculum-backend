import { PersonalData } from "@prisma/client";

export interface IPersonalData {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  imageUser: string;
  email: string;
  numberPhone: string;
  postalCode: string;
  city: string;
  birthday: string;
  typeDriverLicense: string;
  linkedin: string;
  userId: number;
  createdAt: string;
}

export type TypePersonalDataData = Omit<IPersonalData, "id" | "createdAt">;
export type PartialPersonalDataData = Partial<PersonalData>;
