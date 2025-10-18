import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/userModel';
import ErrorHandler from '../utils/errorHandler';
import { UserRole } from '../types/user';
import { Types } from 'mongoose';

interface UpdateProfileRequest {
  name?: string;
  phoneNumber?: string;
  address?: string;
  // Fixer-specific fields
  skills?: string[];
  experienceYears?: number;
  serviceArea?: string;
  description?: string;
  hourlyRate?: number;
  isAvailable?: boolean;
  portfolio?: Array<{images: string[], description: string}>;
  certifications?: Array<{name: string, issuedBy: string, issuedDate: Date}>;
  availability?: Array<{dayOfWeek: number, startTime: string, endTime: string}>;
}

interface UserResponse {
  success: boolean;
  message: string;
  user?: any;
  users?: any[];
}

export const getProfile = async (
  req: Request,
  res: Response<UserResponse>,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findById(req.user?._id);
    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    res.json({
      success: true,
      message: 'Profile retrieved successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        role: user.role,
        isVerified: user.isVerified,
        isActive: user.isActive,
        ...(user.role === UserRole.FIXER && {
          skills: (user as any).skills || [],
          experienceYears: (user as any).experienceYears || 0,
          serviceArea: (user as any).serviceArea || '',
          description: (user as any).description || '',
          rating: (user as any).rating || 0,
          totalJobs: (user as any).totalJobs || 0,
          isAvailable: (user as any).isAvailable ?? true,
          hourlyRate: (user as any).hourlyRate || 0,
          portfolio: (user as any).portfolio || [],
          certifications: (user as any).certifications || [],
          availability: (user as any).availability || []
        })
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request<{}, UserResponse, UpdateProfileRequest>,
  res: Response<UserResponse>,
  next: NextFunction
) => {
  try {
    const updates = req.body;
    const user = await UserModel.findByIdAndUpdate(
      req.user?._id,
      updates,
      { new: true, runValidators: true }
    );

    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        role: user.role,
        isVerified: user.isVerified,
        isActive: user.isActive,
        ...(user.role === UserRole.FIXER && {
          skills: (user as any).skills || [],
          experienceYears: (user as any).experienceYears || 0,
          serviceArea: (user as any).serviceArea || '',
          description: (user as any).description || '',
          rating: (user as any).rating || 0,
          totalJobs: (user as any).totalJobs || 0,
          isAvailable: (user as any).isAvailable ?? true,
          hourlyRate: (user as any).hourlyRate || 0,
          portfolio: (user as any).portfolio || [],
          certifications: (user as any).certifications || [],
          availability: (user as any).availability || []
        })
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (
  req: Request,
  res: Response<UserResponse>,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.user?._id,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    res.json({
      success: true,
      message: 'Account deactivated successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getUsersByRole = async (
  req: Request,
  res: Response<UserResponse>,
  next: NextFunction
) => {
  try {
    const { role } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!Object.values(UserRole).includes(role as UserRole)) {
      return next(new ErrorHandler('Invalid role specified', 400));
    }

    const users = await UserModel.find({ 
      role, 
      isActive: true 
    })
    .select('-password')
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit))
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      message: `${role}s retrieved successfully`,
      users
    });
  } catch (error) {
    next(error);
  }
};