import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

interface AuthRequest extends Request {
    userId: string;
}


router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, (req, res) => {
    return res.json({
        userId: (req as any).userId
    });
});

export default router;