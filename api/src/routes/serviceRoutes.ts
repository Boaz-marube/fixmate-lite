import { Router } from 'express';
import { 
  createService, 
  getServices, 
  getServiceById, 
  updateService, 
  deleteService, 
  getMyServices 
} from '../controllers/serviceController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', getServices);
router.get('/:id', getServiceById);

// Protected routes
router.post('/', authMiddleware, createService);
router.put('/:id', authMiddleware, updateService);
router.delete('/:id', authMiddleware, deleteService);
router.get('/my/services', authMiddleware, getMyServices);

export default router;