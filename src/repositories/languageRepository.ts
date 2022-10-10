import { TypeLanguageData } from "./../types/LanguageTypes";
import client from "../databases/database";

export async function insert(data: TypeLanguageData) {
  const rows = await client.language.create({
    data: {
      language: data.language,
      personalDataId: data.personalDataId,
    },
  });
  return rows;
}
export async function findByResumeId(resumeId: number) {
  const rows = await client.language.findMany({
    where: { personalDataId: resumeId },
  });
  return rows;
}

export async function deleteById(resumeId: number) {
  const rows = await client.language.deleteMany({
    where: { personalDataId: resumeId },
  });
  return rows;
}
