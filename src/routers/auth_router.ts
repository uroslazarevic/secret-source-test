import * as express from "express";
import AuthController from "../controllers/auth_controller";
const router = express.Router();

// Controllers
const authController = new AuthController();

// Routes
router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
