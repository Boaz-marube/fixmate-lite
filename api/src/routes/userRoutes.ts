import { Router } from 'express';
import { getProfile, updateProfile, deleteAccount, getUsersByRole, getFixerStats } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// All routes are protected
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.delete('/account', authMiddleware, deleteAccount);
router.get('/role/:role', authMiddleware, getUsersByRole);
router.get('/fixers/:fixerId/stats', getFixerStats);

export default router;