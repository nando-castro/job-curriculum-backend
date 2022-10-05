import { DriverLicenseType, PersonalData } from "@prisma/client";

export interface IPersonalData {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
  email: string;
  numberPhone: string;
  address: string;
  postalCode: string;
  city: string;
  office: string;
  birthday: string;
  linkedin: string;
  userId: number;
  typeDriverLicense: DriverLicenseType;
  createdAt: string;
}

export type TypePersonalDataData = Omit<IPersonalData, "id" | "createdAt">;
export type PartialPersonalDataData = Partial<PersonalData>;
