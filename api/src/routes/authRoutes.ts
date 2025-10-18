import { Router } from 'express';
import { signup, login, resetPassword,} from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.post('/signup', signup);
router.post('/customer-signup', signup);
router.post('/login', login);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: 'Profile retrieved successfully',
    data: req.user
  });
});

router.post('/logout', authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

router.put('/change-password', authMiddleware, (req, res) => {
  // TODO: Implement change password logic
  res.json({
    success: true,
    message: 'Password change endpoint - TODO'
  });
});

export default router;
