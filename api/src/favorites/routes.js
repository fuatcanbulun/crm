import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.get("/:id", controller.getFavoritesByUserId);
router.post("/", controller.addFavorite);

export default router;
