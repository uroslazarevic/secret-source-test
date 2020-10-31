import * as express from "express";
const router = express.Router();
import AuthController from "../controllers/auth_controller";

// Controllers
const authController = new AuthController();

// Routes
router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
