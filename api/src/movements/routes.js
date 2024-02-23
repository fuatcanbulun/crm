import { Router } from "express";
import controller from "./controller.js";
import { authenticateToken } from "../../middleware/authorization.js";

const router = Router();

router.get("/", authenticateToken, controller.getMovements);
//router.post("/", authenticateToken, controller.addMovement);
router.delete("/:id", authenticateToken, controller.removeMovementById);
//router.put("/", authenticateToken, controller.updateMovement);

export default router;
