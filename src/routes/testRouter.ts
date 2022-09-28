import { Router } from "express";
import * as testController from "../controllers/testController";
import { ensureAuthenticatedMiddleware } from "../middlewares/authValidateMiddleware";

const testRouter = Router();

// testRouter.use(ensureAuthenticatedMiddleware);

testRouter.get("/test", testController.test);

export { testRouter };
