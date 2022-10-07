import { TypeLanguageData } from "./../types/LanguageTypes";
import * as languageRepository from "../repositories/languageRepository";

export async function createLanguage(data: TypeLanguageData) {
  const dataLanguage = { ...data };
  const result = await languageRepository.insert(dataLanguage);
  return result;
}
