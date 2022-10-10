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

export async function findByResumeId(resumeId: number) {
  const rows = await client.skill.findMany({
    where: { personalDataId: resumeId },
  });
  return rows;
}

export async function deleteById(resumeId: number) {
  const rows = await client.skill.deleteMany({
    where: { personalDataId: resumeId },
  });
  return rows;
}
