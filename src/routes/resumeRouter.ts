import { Router } from "express";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import { personalDataSchema } from "../schemas/personalDataSchema";
import * as resumeController from "../controllers/resumeController";
import { ensureAuthenticatedMiddleware } from "../middlewares/authValidateMiddleware";

const resumeRouter = Router();

resumeRouter.use(ensureAuthenticatedMiddleware);

resumeRouter.post(
  "/resume/create",
  schemaValidateMiddleware(personalDataSchema),
  resumeController.createResume
);

export { resumeRouter };
