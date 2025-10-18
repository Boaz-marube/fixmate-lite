import { Router } from 'express';
import { 
  createService, 
  getServices, 
  getServiceById, 
  updateService, 
  deleteService, 
  getMyServices,
  getCategories 
} from '../controllers/serviceController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', getServices);
router.get('/categories', getCategories);

// Protected routes - specific routes before parameterized routes
router.get('/my/services', authMiddleware, getMyServices);
router.post('/', authMiddleware, createService);
router.put('/:id', authMiddleware, updateService);
router.delete('/:id', authMiddleware, deleteService);

// Public parameterized routes (must be last)
router.get('/:id', getServiceById);

export default router;