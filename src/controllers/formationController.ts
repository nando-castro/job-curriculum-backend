import { Request, Response } from "express";
import { TypeFormationData } from "./../types/FormationTypes";
import * as formationService from "../services/formationService";

export async function createFormation(req: Request, res: Response) {
  const dataFormation: TypeFormationData = req.body;
  const { resumeId } = res.locals.resumeId;
  console.log(resumeId + `awui`)
  await formationService.createFormation(resumeId, dataFormation);
  res.sendStatus(201);
}
