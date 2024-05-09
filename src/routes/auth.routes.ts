import express from "express";
import validateResource from "../middlewares/validateResource";
import { createSessionSchema } from "../schema/auth.schema";
import { createSessionHandler, refreshAccessTokenHandler } from "../controllers/auth.controller";

const router = express.Router();

router.post("/api/sessions", validateResource(createSessionSchema), createSessionHandler);
router.post("/api/sessions/refresh", refreshAccessTokenHandler);

export default router;