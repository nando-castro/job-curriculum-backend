import { experienceSchema } from "./../schemas/experienceSchema";
import { Router } from "express";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import * as experienceController from "../controllers/experienceController";
import { ensureAuthenticatedMiddleware } from "../middlewares/authValidateMiddleware";

const experienceRouter = Router();

experienceRouter.use(ensureAuthenticatedMiddleware);

experienceRouter.post(
  "/experience/create",
  schemaValidateMiddleware(experienceSchema),
  experienceController.createExperience
);

experienceRouter.get(
  "/experiences/:resumeId",
  experienceController.getExperiences
);

experienceRouter.delete(
  "/experience/:resumeId",
  experienceController.deleteExperience
);

export { experienceRouter };
