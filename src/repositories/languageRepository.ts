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
