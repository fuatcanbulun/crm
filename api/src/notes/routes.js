import { Router } from "express";
import controller from "./controller.js";
import { authenticateToken } from "../../middleware/authorization.js";

const router = Router();

router.get("/", authenticateToken, controller.getNotes);
// router.get("/:id", authenticateToken, controller.getPersonById);
router.post("/", authenticateToken, controller.addNote);
router.delete("/:id", authenticateToken, controller.removeNoteById);
router.put("/", authenticateToken, controller.updateNote);
router.get("/person/:id", authenticateToken, controller.getNotesByPersonId);

export default router;
