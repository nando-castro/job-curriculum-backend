import { TypeSkillData } from "./../types/SkillTypes";
import * as skillRepository from "../repositories/skillRepository";

export async function createSkill(data: TypeSkillData) {
  const dataSkill = { ...data };
  const result = await skillRepository.insert(dataSkill);
  return result;
}

export async function getSkills(resumeId: number) {
  const result = await skillRepository.findByResumeId(resumeId);
  return result;
}

export async function deleteSkill(resumeId: number) {
  await skillRepository.deleteById(resumeId);
}
