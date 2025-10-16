import { Types } from 'mongoose';

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  address: string;
  userType: 'customer' | 'fixer';
  skills?: string[];
  experienceYears?: number;
  serviceArea?: string;
  nationalId?: string;
  description?: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface CreateUserResponse {
  message: string;
  userId: Types.ObjectId;
}

export interface VerifyResetCodeResponse {
  token: string;
  message: string;
}

export interface MessageResponse {
  message: string;
}