import { Router } from "express";
import controller from "./controller.js";
import { authenticateToken } from "../../middleware/authorization.js";

const router = Router();

router.get("/", authenticateToken, controller.getStocks);
router.post("/", authenticateToken, controller.addStock);
router.delete("/:id", authenticateToken, controller.removeStockById);
// router.put("/", authenticateToken, controller.updateStock);

export default router;
