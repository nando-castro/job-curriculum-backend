import { Router } from "express";
import { experienceRouter } from "./experienceRouter";
import { formationRouter } from "./formationRouter";
import { resumeRouter } from "./resumeRouter";
import { authRouter } from "./userRouter";

const router = Router();

router.use(authRouter);
router.use(resumeRouter);
router.use(formationRouter);
router.use(experienceRouter);

export default router;
