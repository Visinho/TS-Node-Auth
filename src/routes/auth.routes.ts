import express from "express";
import validateResource from "../middlewares/validateResource";
import { createSessionSchema } from "../schema/auth.schema";
import { createSessionHandler } from "../controllers/auth.controller";

const router = express.Router();

router.post("/api/sessions", validateResource(createSessionSchema), createSessionHandler);

export default router;