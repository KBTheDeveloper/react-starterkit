import express from 'express';
import { uploadFile, getUserFiles, deleteFile } from '../controllers/fileController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { upload } from '../services/s3Storage.js';

const router = express.Router();

router.use(verifyToken); // protect all file routes

router.post('/upload', upload.single('file'), uploadFile);
router.get('/', getUserFiles);
router.delete('/:id', deleteFile);

export default router;
