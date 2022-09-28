import { Router } from "express";
import { testRouter } from "./testRouter";

const router = Router();

router.use(testRouter);

export default router;
