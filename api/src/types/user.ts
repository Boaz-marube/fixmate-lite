export enum UserRole {
    CUSTOMER = 'customer',
    FIXER = 'fixer'
}

export interface BaseUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    userType: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Customer extends BaseUser {
    userType: UserRole.CUSTOMER;
    bookingHistory: string[]; 
    preferredServices: string[];
    emergencyContact?: {
        name: string;
        phoneNumber: string;
        relationship: string;
    };
}

export interface Fixer extends BaseUser {
    userType: UserRole.FIXER;
    skills: string[];
    experienceYears: number;
    serviceArea: string;
    nationalId?: string;
    description?: string;
    rating: number;
    totalJobs: number;
    isVerified: boolean;
    isAvailable: boolean;
    hourlyRate: number;
    availability: {
        dayOfWeek: number; // 0-6 (Sunday-Saturday)
        startTime: string; // HH:MM format
        endTime: string; // HH:MM format
    }[];
}