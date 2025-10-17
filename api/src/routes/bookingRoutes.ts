import { Router } from 'express';
import { 
  createBooking, 
  getBookings, 
  getBookingById, 
  updateBookingStatus, 
  cancelBooking 
} from '../controllers/bookingController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// All routes are protected
router.post('/', authMiddleware, createBooking);
router.get('/', authMiddleware, getBookings);
router.get('/:id', authMiddleware, getBookingById);
router.put('/:id/status', authMiddleware, updateBookingStatus);
router.put('/:id/cancel', authMiddleware, cancelBooking);

export default router;