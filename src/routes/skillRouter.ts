import { skillSchema } from "./../schemas/skillSchema";
import { Router } from "express";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import * as skillController from "../controllers/skillControler";
import { ensureAuthenticatedMiddleware } from "../middlewares/authValidateMiddleware";

const skillRouter = Router();

skillRouter.use(ensureAuthenticatedMiddleware);

skillRouter.post(
  "/skill/create",
  schemaValidateMiddleware(skillSchema),
  skillController.createSkill
);

skillRouter.get("/skills/:resumeId", skillController.getSkills);

skillRouter.delete("/skill/:resumeId", skillController.deleteSkill);

export { skillRouter };
