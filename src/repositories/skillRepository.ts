import client from "../databases/database";
import { TypeSkillData } from "./../types/SkillTypes";

export async function insert(data: TypeSkillData) {
  const rows = await client.skill.create({
    data: {
      skill: data.skill,
      personalDataId: data.personalDataId,
    },
  });
  return rows;
}
