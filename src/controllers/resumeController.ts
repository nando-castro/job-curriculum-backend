import { TypePersonalDataData } from "./../types/PersonalDataTypes";
import { Request, Response } from "express";
import * as resumeService from "../services/resumeService";

export async function createResume(req: Request, res: Response) {
  const dataResume: TypePersonalDataData = req.body;
  const { id } = res.locals.user;
  const idResume = await resumeService.createResume(id, dataResume);
  res.status(201).send({ idResume });
}

export async function getResume(req: Request, res: Response) {
  const {resumeId} = req.params
  const { id } = res.locals.user;
  const result = await resumeService.getResume(id, Number(resumeId));
  res.status(200).send(result);
}

export async function getResumes(req: Request, res: Response) {
  const { id } = res.locals.user;
  const result = await resumeService.getResumes(id);
  res.status(200).send(result);
}

export async function updateResume(req: Request, res: Response) {
  const data = req.body;
  const { resumeId } = req.params;
  const { id } = res.locals.user;
  await resumeService.updateResume(Number(resumeId), id, data);
  res.sendStatus(200);
}
