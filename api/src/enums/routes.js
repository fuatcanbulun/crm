import { Router } from "express";
import controller from "./controller.js";
import { authenticateToken } from "../../middleware/authorization.js";

const router = Router();

router.get("/person-types", authenticateToken, controller.getEnumPersonTypes);
router.get("/gender-types", authenticateToken, controller.getEnumGenderTypes);
router.get("/cities", authenticateToken, controller.getEnumCities);
router.get(
  "/appointment-types",
  authenticateToken,
  controller.getEnumAppointmentTypes
);
router.get(
  "/appointment-status-types",
  authenticateToken,
  controller.getEnumAppointmentStatusTypes
);
router.get(
  "/accounting-types",
  authenticateToken,
  controller.getEnumAccountingTypes
);
router.get("/income-types", authenticateToken, controller.getEnumIncomeTypes);
router.get("/expense-types", authenticateToken, controller.getEnumExpenseTypes);
router.get("/payment-types", authenticateToken, controller.getEnumPaymentTypes);
router.get("/product-types", authenticateToken, controller.getEnumProductTypes);
router.get(
  "/currency-types",
  authenticateToken,
  controller.getEnumCurrencyTypes
);
router.get(
  "/stock-movement-types",
  authenticateToken,
  controller.getEnumStockMovementTypes
);

export default router;
