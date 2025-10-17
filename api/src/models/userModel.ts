import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { UserRole } from "../types/user";

// Email regex pattern
const emailRegexPattern: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  avatar?: {
    public_id: string;
    url: string;
  };
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  
  // Customer-specific fields
  bookingHistory?: Array<{ bookingId: string }>;
  preferredServices?: string[];
  emergencyContact?: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };
  
  // Fixer-specific fields
  skills?: string[];
  experienceYears?: number;
  serviceArea?: string;
  nationalId?: string;
  description?: string;
  rating?: number;
  totalJobs?: number;
  isAvailable?: boolean;
  hourlyRate?: number;
  portfolio?: Array<{
    images: string[];
    description: string;
  }>;
  certifications?: Array<{
    name: string;
    issuedBy: string;
    issuedDate: Date;
    expiryDate?: Date;
    certificateUrl?: string;
  }>;
  availability?: Array<{
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }>;
  
  comparePassword(password: string): Promise<boolean>;
}

// Create the User schema
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"]
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "Please enter a valid email",
      },
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter your phone number"],
      match: [/^\+254[0-9]{9}$/, "Phone number must be in format +254 123456789"]
    },
    address: {
      type: String,
      required: [true, "Please enter your address"],
      trim: true
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CUSTOMER,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    
    // Customer-specific fields
    bookingHistory: [{
      bookingId: {
        type: Schema.Types.ObjectId,
        ref: "Booking"
      }
    }],
    preferredServices: [String],
    emergencyContact: {
      name: String,
      phoneNumber: String,
      relationship: String
    },
    
    // Fixer-specific fields
    skills: [{
      type: String,
      trim: true
    }],
    experienceYears: {
      type: Number,
      min: [0, "Experience cannot be negative"],
      max: [50, "Experience cannot exceed 50 years"]
    },
    serviceArea: {
      type: String,
      trim: true
    },
    nationalId: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"]
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be negative"],
      max: [5, "Rating cannot exceed 5"]
    },
    totalJobs: {
      type: Number,
      default: 0,
      min: [0, "Total jobs cannot be negative"]
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    hourlyRate: {
      type: Number,
      min: [0, "Hourly rate cannot be negative"]
    },
    portfolio: [{
      images: [String],
      description: {
        type: String,
        maxlength: [200, "Portfolio description cannot exceed 200 characters"]
      }
    }],
    certifications: [{
      name: {
        type: String,
        required: true
      },
      issuedBy: {
        type: String,
        required: true
      },
      issuedDate: {
        type: Date,
        required: true
      },
      expiryDate: Date,
      certificateUrl: String
    }],
    availability: [{
      dayOfWeek: {
        type: Number,
        min: 0,
        max: 6
      },
      startTime: {
        type: String,
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Time must be in HH:MM format"]
      },
      endTime: {
        type: String,
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Time must be in HH:MM format"]
      }
    }]
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export model
const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default UserModel;