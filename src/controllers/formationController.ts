import { Request, Response } from "express";
import { TypeFormationData } from "./../types/FormationTypes";
import * as formationService from "../services/formationService";

export async function createFormation(req: Request, res: Response) {
  const dataFormation: TypeFormationData = req.body;

  await formationService.createFormation(dataFormation);
  res.sendStatus(201);
}

export async function getFormations(req: Request, res: Response) {
  const { resumeId } = req.params;

  const formations = await formationService.getFormations(Number(resumeId));
  res.status(200).send(formations);
}

export async function deleteFormation(req: Request, res: Response) {
  const { resumeId } = req.params;
  await formationService.deleteFormation(Number(resumeId));
  res.sendStatus(200);
}
