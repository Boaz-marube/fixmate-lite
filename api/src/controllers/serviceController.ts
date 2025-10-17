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
    const { category, fixerId, page = 1, limit = 10 } = req.query;
    
    const filter: any = { isActive: true };
    if (category) filter.category = category;
    if (fixerId) filter.fixerId = fixerId;

    const services = await ServiceModel.find(filter)
      .populate('fixerId', 'name email rating')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await ServiceModel.countDocuments(filter);

    res.json({
      success: true,
      message: 'Services retrieved successfully',
      services,
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