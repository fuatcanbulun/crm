import { Router } from "express";
import controller from "./controller.js";
import { authenticateToken } from "../../middleware/authorization.js";

const router = Router();

router.get("/", authenticateToken, controller.getAccountings);
router.get(
  "/person/:id",
  authenticateToken,
  controller.getAccountingsByPersonId
);
router.post("/", authenticateToken, controller.addAccounting);
router.delete("/:id", authenticateToken, controller.removeAccountingById);
router.put("/", authenticateToken, controller.updateAccounting);
router.put("/", authenticateToken, controller.updateAccounting);
router.get("/date", authenticateToken, controller.getAccountingsByDate);

export default router;
