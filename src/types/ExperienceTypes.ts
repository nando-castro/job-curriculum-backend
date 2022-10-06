import { Experience } from "@prisma/client";

export interface IExperience {
  id: number;
  occupation: string;
  company: string;
  city: string;
  monthStart: string;
  yearStart: string;
  monthEnd: string;
  yearEnd: string;
  description: string;
  personalDataId: number;
  createdAt: string;
}

export type TypeExperienceData = Omit<IExperience, "id" | "createdAt">;
export type PartialExperienceData = Partial<Experience>;
