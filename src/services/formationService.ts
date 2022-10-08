import { TypeFormationData } from "./../types/FormationTypes";
import * as formationRepository from "../repositories/formationRepository";

export async function createFormation(data: TypeFormationData) {
  const dataFormation = { ...data };
  const result = await formationRepository.insert(dataFormation);
  return result;
}

export async function getFormations(resumeId: number) {
  const result = await formationRepository.findByResumeId(resumeId);
  return result;
}
