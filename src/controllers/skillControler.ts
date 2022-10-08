import { Request, Response } from "express";
import { TypeSkillData } from "./../types/SkillTypes";
import * as skillService from "../services/skillService";

export async function createSkill(req: Request, res: Response) {
  const dataSkill: TypeSkillData = req.body;
  await skillService.createSkill(dataSkill);
  res.sendStatus(201);
}

export async function getSkills(req: Request, res: Response) {
  const { resumeId } = req.body;

  const skills = await skillService.getSkills(resumeId);
  res.status(200).send(skills);
}
