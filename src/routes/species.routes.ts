import { Router } from "express";
import * as speciesController from "../controllers/species.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, speciesController.create);
router.get("/", authMiddleware, speciesController.list);
router.get(
    "/stats/by-category",
    authMiddleware,
    speciesController.speciesByCategory
);

export default router;