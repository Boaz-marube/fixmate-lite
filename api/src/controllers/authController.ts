import { Request, Response, NextFunction } from 'express';
import UserModel from "../models/userModel";
import { generateToken } from "../utils/jwt";
import { UserRole } from '../types/user';
import ErrorHandler from "../utils/errorHandler";
import { Types } from 'mongoose';

interface SignupRequest {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    role?: UserRole;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface AuthResponse {
    success: boolean;
    message: string;
    user?: {
        _id: string;
        name: string;
        email: string;
        phoneNumber: string;
        address: string;
        role: UserRole;
        isVerified: boolean;
        isActive: boolean;
        // Fixer-specific fields (optional)
        skills?: string[];
        experienceYears?: number;
        serviceArea?: string;
        description?: string;
        rating?: number;
        totalJobs?: number;
        isAvailable?: boolean;
        hourlyRate?: number;
        portfolio?: Array<{images: string[], description: string}>;
        certifications?: Array<{name: string, issuedBy: string, issuedDate: Date}>;
    };
    token?: string;
}

interface ApiResponse {
    success: boolean;
    message: string;
}

export const signup = async (
    req: Request<{}, AuthResponse, SignupRequest>,
    res: Response<AuthResponse>,
    next: NextFunction
) => {
    try {
        const {
            name, email, password, phoneNumber, address, role = UserRole.CUSTOMER
        } = req.body;
        
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return next(new ErrorHandler("User already exists with this email", 400));
        }

        // Validate fixer-specific fields if role is fixer
        if (role === UserRole.FIXER) {
            const { skills, experienceYears, serviceArea, hourlyRate } = req.body as any;
            
            if (!skills || !Array.isArray(skills) || skills.length === 0) {
                return next(new ErrorHandler("Fixers must provide at least one skill", 400));
            }
            
            if (experienceYears === undefined || experienceYears < 0) {
                return next(new ErrorHandler("Fixers must provide valid experience years", 400));
            }
            
            if (!serviceArea || serviceArea.trim() === '') {
                return next(new ErrorHandler("Fixers must provide service area", 400));
            }
            
            if (!hourlyRate || hourlyRate <= 0) {
                return next(new ErrorHandler("Fixers must provide valid hourly rate", 400));
            }
        }

        // Create user
        const user = await UserModel.create({
            name,
            email,
            password,
            phoneNumber,
            address,
            role,
            ...(role === UserRole.FIXER && {
                skills: (req.body as any).skills,
                experienceYears: (req.body as any).experienceYears,
                serviceArea: (req.body as any).serviceArea,
                hourlyRate: (req.body as any).hourlyRate,
                description: (req.body as any).description || ''
            })
        });

        // Generate token
        const token = generateToken((user._id as Types.ObjectId).toString());

        const userResponse: any = {
            _id: (user._id as Types.ObjectId).toString(),
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
        };

        // Add fixer-specific fields if user is a fixer
        if (user.role === UserRole.FIXER) {
            userResponse.skills = user.skills || [];
            userResponse.experienceYears = user.experienceYears || 0;
            userResponse.serviceArea = user.serviceArea || '';
            userResponse.description = user.description || '';
            userResponse.rating = user.rating || 0;
            userResponse.totalJobs = user.totalJobs || 0;
            userResponse.isAvailable = user.isAvailable ?? true;
            userResponse.hourlyRate = user.hourlyRate || 0;
            userResponse.portfolio = user.portfolio || [];
            userResponse.certifications = user.certifications || [];
        }

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: userResponse,
            token,
        });
    } catch (error: any) {
        next(error);
    }
};

export const login = async (
    req: Request<{}, AuthResponse, LoginRequest>,
    res: Response<AuthResponse>,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;

        // Find user with password
        const user = await UserModel.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        // Generate token
        const token = generateToken((user._id as Types.ObjectId).toString());

        const userResponse: any = {
            _id: (user._id as Types.ObjectId).toString(),
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
        };

        // Add fixer-specific fields if user is a fixer
        if (user.role === UserRole.FIXER) {
            userResponse.skills = user.skills || [];
            userResponse.experienceYears = user.experienceYears || 0;
            userResponse.serviceArea = user.serviceArea || '';
            userResponse.description = user.description || '';
            userResponse.rating = user.rating || 0;
            userResponse.totalJobs = user.totalJobs || 0;
            userResponse.isAvailable = user.isAvailable ?? true;
            userResponse.hourlyRate = user.hourlyRate || 0;
            userResponse.portfolio = user.portfolio || [];
            userResponse.certifications = user.certifications || [];
        }

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: userResponse,
            token,
        });
    } catch (error: any) {
        next(error);
    }
};

export const resetPassword = async (
    req: Request<{}, ApiResponse, { email: string }>,
    res: Response<ApiResponse>,
    next: NextFunction
) => {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return next(new ErrorHandler("User not found with this email", 404));
        }

        // TODO: Implement email sending logic here
        res.status(200).json({
            success: true,
            message: "Password reset code sent to your email",
        });
    } catch (error: any) {
        next(error);
    }
};