import { TypeExperienceData } from "./../types/ExperienceTypes";
import { Request, Response } from "express";
import * as experienceService from "../services/experienceService";

export async function createExperience(req: Request, res: Response) {
  const dataExperience: TypeExperienceData = req.body;

  await experienceService.createExperience(dataExperience);
  res.sendStatus(201);
}
