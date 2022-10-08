import { TypeExperienceData } from "./../types/ExperienceTypes";
import * as experienceRepoitory from "../repositories/experienceRepository";

export async function createExperience(data: TypeExperienceData) {
  const dataExperience = { ...data };
  const result = await experienceRepoitory.insert(dataExperience);
  return result;
}

export async function getExperiences(resumeId: number) {
  const result = await experienceRepoitory.findByResumeId(resumeId);
  return result;
}
