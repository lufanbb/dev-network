import { Router } from "express";
import userRouter from "./user-router";
import postRouter from "./post-router";
import profileRouter from "./profile-router";

const router = Router();

router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/profile", profileRouter);

export default router;
