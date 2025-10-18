import { Router } from 'express';
import { createReview } from '../controllers/reviewController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Protected routes
router.post('/', authMiddleware, createReview);

export default router;