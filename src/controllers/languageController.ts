import { TypeLanguageData } from "./../types/LanguageTypes";
import { Request, Response } from "express";
import * as languageService from "../services/languageService";

export async function createLanguage(req: Request, res: Response) {
  const dataLanguage: TypeLanguageData = req.body;
  await languageService.createLanguage(dataLanguage);
  res.sendStatus(201);
}

export async function getLanguages(req: Request, res: Response) {
  const { resumeId } = req.params;

  const languages = await languageService.getLanguages(Number(resumeId));
  res.status(200).send(languages);
}

export async function deleteLanguage(req: Request, res: Response) {
  const { resumeId } = req.params;
  await languageService.deleteLanguage(Number(resumeId));
  res.sendStatus(200);
}
