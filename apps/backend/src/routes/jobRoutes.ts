import express from "express";
import { scheduleEmail, getJobStatus } from "../controllers/jobController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(verifyToken);

router.post("/email", scheduleEmail);
router.get("/:id", getJobStatus);

export default router;
