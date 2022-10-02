import { DriverLicenseType, PersonalData } from "@prisma/client";

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
  linkedin: string;
  userId: number;
  typeDriverLicense: DriverLicenseType;
  createdAt: string;
}

export type TypePersonalDataData = Omit<IPersonalData, "id" | "createdAt">;
export type PartialPersonalDataData = Partial<PersonalData>;
