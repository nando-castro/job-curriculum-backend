import { Skill } from "@prisma/client";

export interface ISkill {
  id: number;
  skill: string;
  personalDataId: number;
  createdAt: string;
}

export type TypeSkillData = Omit<ISkill, "id" | "createdAt">;
export type PartialSkillData = Partial<Skill>;
