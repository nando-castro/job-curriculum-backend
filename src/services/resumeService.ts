import { TypePersonalDataData } from "./../types/PersonalDataTypes";
import * as resumeRepository from "../repositories/resumeRepository";
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
