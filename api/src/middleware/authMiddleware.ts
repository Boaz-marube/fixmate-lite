import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import UserModel from '../models/userModel';
import ErrorHandler from '../utils/errorHandler';
import { UserRole } from '../types/user';
import { Types } from 'mongoose';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        name: string;
        email: string;
        role: UserRole;
        isVerified: boolean;
      };
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return next(new ErrorHandler('Access denied. No token provided', 401));
    }

    // Verify token
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (jwtError) {
      return next(new ErrorHandler('Invalid or expired token', 401));
    }
    
    // Get user from database
    const user = await UserModel.findById(decoded.userId)
      .select('name email role isVerified isActive');
    if (!user) {
      return next(new ErrorHandler('Token is valid but user not found', 401));
    }
    
    if (!user.isActive) {
      return next(new ErrorHandler('Account is deactivated', 401));
    }

    // Add user to request object
    req.user = {
      _id: (user._id as Types.ObjectId).toString(),
      name: user.name,
      email: user.email,
      role: user.role as UserRole,
      isVerified: user.isVerified
    };

    next();
  } catch (error: any) {
    next(error);
  }
};
