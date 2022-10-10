import { formationSchema } from "./../schemas/formationSchema";
import { Router } from "express";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import * as formationController from "../controllers/formationController";
import { ensureAuthenticatedMiddleware } from "../middlewares/authValidateMiddleware";

const formationRouter = Router();

formationRouter.use(ensureAuthenticatedMiddleware);

formationRouter.post(
  "/formation/create",
  schemaValidateMiddleware(formationSchema),
  formationController.createFormation
);

formationRouter.get("/formations/:resumeId", formationController.getFormations);

formationRouter.delete(
  "/formation/:resumeId",
  formationController.deleteFormation
);

export { formationRouter };
