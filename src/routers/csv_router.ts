import * as express from "express";
import CSVController from "../controllers/csv_controller";
import { authMiddlewares, uploadMiddleware } from "../middlewares";
const router = express.Router();

// Controllers
const csvController = new CSVController();

// Routes
router.post("/csv/upload", [authMiddlewares.checkAuth, uploadMiddleware.uploadSingleFile], csvController.upload);
// NOTE: for testing purposes
router.post("/csv/report", [authMiddlewares.checkAuth, uploadMiddleware.uploadSingleFile], csvController.report);

export default router;
