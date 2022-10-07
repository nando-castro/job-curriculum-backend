import { TypeLanguageData } from "./../types/LanguageTypes";
import { Request, Response } from "express";
import * as languageService from "../services/languageService";

export async function createLanguage(req: Request, res: Response) {
  const dataLanguage: TypeLanguageData = req.body;
  await languageService.createLanguage(dataLanguage);
  res.sendStatus(201);
}
