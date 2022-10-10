import { unauthorizedError } from "./../utils/errorUtils";
import { TypePersonalDataData } from "./../types/PersonalDataTypes";
import * as resumeRepository from "../repositories/resumeRepository";
import * as skillRepository from "../repositories/skillRepository";
import * as languageRepository from "../repositories/languageRepository";
import * as formationRepository from "../repositories/formationRepository";
import * as experienceRepository from "../repositories/experienceRepository";
import { conflictError } from "../utils/errorUtils";

export async function createResume(userId: number, data: TypePersonalDataData) {
  const resumeTitleExists = await resumeRepository.findbyTitle(
    userId,
    data.title
  );

  if (resumeTitleExists) throw conflictError(`Title exists`);
  const dataResume = { ...data, userId };
  const { id } = await resumeRepository.insert(dataResume);
  return id;
}

export async function getResume(resumeId: number, userId: number) {
  const resume = await resumeRepository.findResumeById(resumeId, userId);
  if (resume.length === 0) throw unauthorizedError(`Not authorized`);
  return resume;
}

export async function getResumes(userId: number) {
  const resume = await resumeRepository.findByUserId(userId);
  return resume;
}

export async function updateResume(
  resumeId: number,
  userId: number,
  data: TypePersonalDataData
) {
  const resumeTitleExists = await resumeRepository.findbyTitle(
    userId,
    data.title
  );
  if (resumeTitleExists) throw conflictError(`Title exists`);
  await resumeRepository.update(resumeId, data);
}

export async function deleteResume(resumeId: number) {
  await skillRepository.deleteById(resumeId);
  await languageRepository.deleteById(resumeId);
  await formationRepository.deleteById(resumeId);
  await experienceRepository.deleteById(resumeId);
  await resumeRepository.deleteById(resumeId);
}
