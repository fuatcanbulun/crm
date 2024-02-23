import { Router } from "express";
import controller from "./controller.js";
import { authenticateToken } from "../../middleware/authorization.js";

const router = Router();

router.get("/", authenticateToken, controller.getProducts);
router.post("/", authenticateToken, controller.addProduct);
router.delete("/:id", authenticateToken, controller.removeProductById);
router.put("/", authenticateToken, controller.updateProduct);

export default router;
