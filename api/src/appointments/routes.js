import { Router } from "express";
import controller from "./controller.js";
import { authenticateToken } from "../../middleware/authorization.js";

const router = Router();

router.get("/", authenticateToken, controller.getAppointments);
router.get(
  "/person/:id",
  authenticateToken,
  controller.getAppointmentsByPersonId
);
router.post("/", authenticateToken, controller.addAppointment);
router.delete("/:id", authenticateToken, controller.removeAppointmentById);
router.put("/", authenticateToken, controller.updateAppointment);

export default router;
