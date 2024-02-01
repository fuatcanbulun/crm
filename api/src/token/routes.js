import { Router } from "express";
import controller from "./controller.js";
import { authenticateToken } from "../../middleware/authorization.js";

const router = Router();
router.get("/", authenticateToken, controller.checkToken);
export default router;
