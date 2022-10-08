import { languageSchema } from "./../schemas/languageSchema";
import { Router } from "express";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import * as languageController from "../controllers/languageController";
import { ensureAuthenticatedMiddleware } from "../middlewares/authValidateMiddleware";

const languageRouter = Router();

languageRouter.use(ensureAuthenticatedMiddleware);

languageRouter.post(
  "/language/create",
  schemaValidateMiddleware(languageSchema),
  languageController.createLanguage
);

languageRouter.get("/languages", languageController.getLanguages);

export { languageRouter };
