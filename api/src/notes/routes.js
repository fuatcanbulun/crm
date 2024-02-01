import { Router } from "express";
import controller from "./controller.js";
import { authenticateToken } from "../../middleware/authorization.js";

const router = Router();

router.get("/", authenticateToken, controller.getNotes);
// router.get("/:id", authenticateToken, controller.getPersonById);
// router.post("/", authenticateToken, controller.addPerson);
// router.delete("/:id", authenticateToken, controller.removePersonById);
// router.put("/", authenticateToken, controller.updatePerson);

export default router;
