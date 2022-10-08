import client from "../databases/database";
import { TypeExperienceData } from "./../types/ExperienceTypes";

export async function insert(data: TypeExperienceData) {
  const rows = await client.experience.create({
    data: {
      occupation: data.occupation,
      company: data.company,
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
  const rows = await client.experience.findMany({
    where: { personalDataId: resumeId },
  });
  return rows;
}
