import express from 'express';
import { sendTestEmail, sendWelcomeEmailController } from '../controllers/emailController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect routes
router.use(verifyToken);

router.post('/send', sendTestEmail);
router.post('/welcome', sendWelcomeEmailController);

export default router;
