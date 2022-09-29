import { Router } from "express";
import { testRouter } from "./testRouter";
import { authRouter } from "./userRouter";

const router = Router();

router.use(testRouter);
router.use(authRouter);

export default router;
