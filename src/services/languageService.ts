import { TypeLanguageData } from "./../types/LanguageTypes";
import * as languageRepository from "../repositories/languageRepository";

export async function createLanguage(data: TypeLanguageData) {
  const dataLanguage = { ...data };
  const result = await languageRepository.insert(dataLanguage);
  return result;
}

export async function getLanguages(resumeId: number) {
  const result = await languageRepository.findByResumeId(resumeId);
  return result;
}

export async function deleteLanguage(resumeId: number) {
  await languageRepository.deleteById(resumeId);
}
