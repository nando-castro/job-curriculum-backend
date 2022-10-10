import client from "../databases/database";
import { TypeFormationData } from "../types/FormationTypes";

export async function insert(data: TypeFormationData) {
  const rows = await client.formation.create({
    data: {
      formation: data.formation,
      institution: data.institution,
      city: data.city,
      monthStart: data.monthStart,
      yearStart: data.yearStart,
      monthEnd: data.monthEnd,
      yearEnd: data.yearEnd,
      description: data.description,
      personalDataId: data.personalDataId,
    },
  });
  return rows;
}

export async function findByResumeId(resumeId: number) {
  const rows = await client.formation.findMany({
    where: { personalDataId: resumeId },
  });
  return rows;
}
export async function deleteById(resumeId: number) {
  const rows = await client.formation.deleteMany({
    where: { personalDataId: resumeId },
  });
  return rows;
}
