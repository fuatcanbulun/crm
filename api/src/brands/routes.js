import { Router } from "express";
import controller from "./controller.js";
import { authenticateToken } from "../../middleware/authorization.js";

const router = Router();

router.get("/", authenticateToken, controller.getBrands);
router.post("/", authenticateToken, controller.addBrand);
router.delete("/:id", authenticateToken, controller.removeBrandById);
router.put("/", authenticateToken, controller.updateBrand);

export default router;
