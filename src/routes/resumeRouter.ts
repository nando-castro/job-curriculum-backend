import { Router } from "express";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import * as resumeController from "../controllers/resumeController";

const resumeRouter = Router();

resumeRouter.post(
  "/resume/create",
  schemaValidateMiddleware(),
  resumeController
);

resumeRouter.get("/resumes", schemaValidateMiddleware(), resumeController);

export { resumeRouter };
