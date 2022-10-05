import { TypeFormationData } from "./../types/FormationTypes";
import * as formationRepository from "../repositories/formationRepository";

export async function createFormation(
  resumeId: number,
  data: TypeFormationData
) {
  console.log(resumeId);
  const dataFormation = { ...data };
  console.log(dataFormation);
}
