import { Router } from "express";
import controller from "./controller.js";
import { authenticateToken } from "../../middleware/authorization.js";

const router = Router();

router.get("/", authenticateToken, controller.getVideos);
router.get("/:id", controller.getVideoById);

// router.post("/", controller.addStudent);
// router.get("/:id", controller.getStudentById);
// router.delete("/:id", controller.removeStudent);
// router.put("/:id", controller.updateStudent);

export default router;
