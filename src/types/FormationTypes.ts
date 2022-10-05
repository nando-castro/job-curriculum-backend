import { Formation } from "@prisma/client";

export interface IFormation {
  id: number;
  formation: string;
  institution: string;
  city: string;
  monthStart: string;
  yearStart: string;
  monthEnd: string;
  yearEnd: string;
  description: string;
  personalDataId: number;
  createdAt: string;
}

export type TypeFormationData = Omit<IFormation, "id" | "createdAt">;
export type PartialFormationData = Partial<Formation>;
