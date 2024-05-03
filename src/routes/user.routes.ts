import express from "express";
import validateResource from "../middlewares/validateResource";
import { createUserSchema, forgotPasswordSchema, verifyUserSchema } from "../schema/user.schema";
import { createUserHandler, forgotPasswordHandler, verifyUserHandler } from "../controllers/user.controller";

const router = express.Router();

router.post("/api/users", validateResource(createUserSchema), createUserHandler);
router.post("/api/users/verify/:id/:verificationCode", validateResource(verifyUserSchema), verifyUserHandler);
router.post("/api/users/forgotPassword", validateResource(forgotPasswordSchema), forgotPasswordHandler)

export default router;