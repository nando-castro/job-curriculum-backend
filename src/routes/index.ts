import { Router } from "express";
import { resumeRouter } from "./resumeRouter";
import { authRouter } from "./userRouter";

const router = Router();

router.use(authRouter);
router.use(resumeRouter);

export default router;
