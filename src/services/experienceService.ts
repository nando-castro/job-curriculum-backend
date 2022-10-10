import { TypeExperienceData } from "./../types/ExperienceTypes";
import * as experienceRepository from "../repositories/experienceRepository";

export async function createExperience(data: TypeExperienceData) {
  const dataExperience = { ...data };
  const result = await experienceRepository.insert(dataExperience);
  return result;
}

export async function getExperiences(resumeId: number) {
  const result = await experienceRepository.findByResumeId(resumeId);
  return result;
}

export async function deleteExperience(resumeId: number) {
  await experienceRepository.deleteById(resumeId);
}
