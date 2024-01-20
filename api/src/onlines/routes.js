import { Router } from "express";
import controller from "./controller.js";
import { authenticateToken } from "../../middleware/authorization.js";

const router = Router();

router.get("/", authenticateToken, controller.getOnlines);

export default router;
