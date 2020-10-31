import * as express from "express";
import CSVController from "../controllers/csv_controller";
import { authMiddlewares } from "../middlewares";
const router = express.Router();

// Controllers
const authController = new CSVController();

// Routes
router.post("/csv/upload", [authMiddlewares.checkAuth], authController.upload);

export default router;
