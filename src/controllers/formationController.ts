import { Request, Response } from "express";
import { TypeFormationData } from "./../types/FormationTypes";
import * as formationService from "../services/formationService";

export async function createFormation(req: Request, res: Response) {
  const dataFormation: TypeFormationData = req.body;

  await formationService.createFormation(dataFormation);
  res.sendStatus(201);
}
