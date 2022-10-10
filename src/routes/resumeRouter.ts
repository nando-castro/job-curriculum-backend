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

resumeRouter.get("/resume/:resumeId", resumeController.getResume);
resumeRouter.get("/resumes", resumeController.getResumes);

resumeRouter.put(
  "/resume/update/:resumeId",
  schemaValidateMiddleware(personalDataSchema),
  resumeController.updateResume
);

resumeRouter.delete("/resume/:resumeId", resumeController.deleteResume);

export { resumeRouter };
