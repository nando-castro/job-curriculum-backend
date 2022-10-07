import { Request, Response } from "express";
import { TypeSkillData } from "./../types/SkillTypes";
import * as skillService from "../services/skillService";

export async function createSkill(req: Request, res: Response) {
  const dataSkill: TypeSkillData = req.body;
  await skillService.createSkill(dataSkill);
  res.sendStatus(201);
}
