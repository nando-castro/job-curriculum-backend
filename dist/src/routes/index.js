"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const experienceRouter_1 = require("./experienceRouter");
const formationRouter_1 = require("./formationRouter");
const languageRouter_1 = require("./languageRouter");
const resumeRouter_1 = require("./resumeRouter");
const skillRouter_1 = require("./skillRouter");
const userRouter_1 = require("./userRouter");
const router = (0, express_1.Router)();
router.use(userRouter_1.authRouter);
router.use(resumeRouter_1.resumeRouter);
router.use(formationRouter_1.formationRouter);
router.use(experienceRouter_1.experienceRouter);
router.use(skillRouter_1.skillRouter);
router.use(languageRouter_1.languageRouter);
exports.default = router;
