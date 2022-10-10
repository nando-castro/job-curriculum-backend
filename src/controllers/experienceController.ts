import { TypeExperienceData } from "./../types/ExperienceTypes";
import { Request, Response } from "express";
import * as experienceService from "../services/experienceService";

export async function createExperience(req: Request, res: Response) {
  const dataExperience: TypeExperienceData = req.body;

  await experienceService.createExperience(dataExperience);
  res.sendStatus(201);
}

export async function getExperiences(req: Request, res: Response) {
  const { resumeId } = req.params;

  const experiences = await experienceService.getExperiences(Number(resumeId));
  res.status(200).send(experiences);
}

export async function deleteExperience(req: Request, res: Response) {
  const { resumeId } = req.params;
  await experienceService.deleteExperience(Number(resumeId));
  res.sendStatus(200);
}
