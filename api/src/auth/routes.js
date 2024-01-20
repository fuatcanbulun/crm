import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.post("/login", controller.login);
router.get("/refresh_token", controller.refreshToken);
router.delete("/refresh_token", controller.deleteRefreshToken);

// router.post("/", controller.addStudent);
// router.get("/:id", controller.getStudentById);
// router.delete("/:id", controller.removeStudent);
// router.put("/:id", controller.updateStudent);

export default router;
