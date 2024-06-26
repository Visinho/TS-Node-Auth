import express from "express";
import auth from "./auth.routes";
import user from "./user.routes";

const router = express.Router();

router.get("/healthcheck", (_, res) => res.sendStatus(200));

router.use(auth);
router.use(user);

export default router;