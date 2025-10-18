import { Request, Response, NextFunction } from 'express';
import ServiceModel from '../models/serviceModel';
import UserModel from '../models/userModel';
import ErrorHandler from '../utils/errorHandler';
import { UserRole } from '../types/user';

interface CreateServiceRequest {
  title: string;
  description: string;
  category: string;
  price: number;
  duration: number;
}

interface ServiceResponse {
  success: boolean;
  message: string;
  service?: any;
  services?: any[];
  total?: number;
}

export const createService = async (
  req: Request<{}, ServiceResponse, CreateServiceRequest>,
  res: Response<ServiceResponse>,
  next: NextFunction
) => {
  try {
    // Only fixers can create services
    if (req.user?.role !== UserRole.FIXER) {
      return next(new ErrorHandler('Only fixers can create services', 403));
    }

    // Validate fixer exists and is active
    const fixer = await UserModel.findById(req.user._id);
    if (!fixer || !fixer.isActive || fixer.role !== UserRole.FIXER) {
      return next(new ErrorHandler('Invalid fixer account', 403));
    }

    const service = await ServiceModel.create({
      ...req.body,
      fixerId: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      service
    });
  } catch (error) {
    next(error);
  }
};

export const getServices = async (
  req: Request,
  res: Response<ServiceResponse>,
  next: NextFunction
) => {
  try {
    const { 
      category, 
      fixerId, 
      minPrice, 
      maxPrice, 
      minRating,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1, 
      limit = 10 
    } = req.query;
    
    const filter: any = { isActive: true };
    
    // Category filter
    if (category) filter.category = category;
    
    // Fixer filter
    if (fixerId) filter.fixerId = fixerId;
    
    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    // Text search filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

    let query = ServiceModel.find(filter)
      .populate('fixerId', 'name email rating totalJobs isAvailable')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort(sort);

    const services = await query;
    
    // Filter by fixer rating if specified
    let filteredServices = services;
    if (minRating) {
      filteredServices = services.filter(service => 
        (service.fixerId as any).rating >= Number(minRating)
      );
    }

    const total = await ServiceModel.countDocuments(filter);

    res.json({
      success: true,
      message: 'Services retrieved successfully',
      services: filteredServices,
      total
    });
  } catch (error) {
    next(error);
  }
};

export const getServiceById = async (
  req: Request,
  res: Response<ServiceResponse>,
  next: NextFunction
) => {
  try {
    const service = await ServiceModel.findById(req.params.id)
      .populate('fixerId', 'name email phoneNumber rating completedJobs');

    if (!service) {
      return next(new ErrorHandler('Service not found', 404));
    }

    res.json({
      success: true,
      message: 'Service retrieved successfully',
      service
    });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (
  req: Request,
  res: Response<ServiceResponse>,
  next: NextFunction
) => {
  try {
    const service = await ServiceModel.findById(req.params.id);
    
    if (!service) {
      return next(new ErrorHandler('Service not found', 404));
    }

    // Only service owner can update
    if (service.fixerId.toString() !== req.user?._id) {
      return next(new ErrorHandler('Not authorized to update this service', 403));
    }

    const updatedService = await ServiceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Service updated successfully',
      service: updatedService
    });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (
  req: Request,
  res: Response<ServiceResponse>,
  next: NextFunction
) => {
  try {
    const service = await ServiceModel.findById(req.params.id);
    
    if (!service) {
      return next(new ErrorHandler('Service not found', 404));
    }

    // Only service owner can delete
    if (service.fixerId.toString() !== req.user?._id) {
      return next(new ErrorHandler('Not authorized to delete this service', 403));
    }

    // Soft delete
    await ServiceModel.findByIdAndUpdate(req.params.id, { isActive: false });

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getMyServices = async (
  req: Request,
  res: Response<ServiceResponse>,
  next: NextFunction
) => {
  try {
    const services = await ServiceModel.find({ 
      fixerId: req.user?._id,
      isActive: true 
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      message: 'Your services retrieved successfully',
      services
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({
      success: true,
      message: 'Categories retrieved successfully',
      categories: ['plumbing', 'electrical', 'carpentry', 'painting', 'cleaning', 'appliance-repair', 'other']
    });
  } catch (error) {
    next(error);
  }
};