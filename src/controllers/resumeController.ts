import { TypePersonalDataData } from "./../types/PersonalDataTypes";
import { Request, Response } from "express";
import * as resumeService from "../services/resumeService";

export async function createResume(req: Request, res: Response) {
  const dataResume: TypePersonalDataData = req.body;
  const { id } = res.locals.user;
  const idResume = await resumeService.createResume(id, dataResume);
  res.status(201).send({ idResume });
}
