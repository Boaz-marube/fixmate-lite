import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  category: string;
  price: number;
  duration: number; // in minutes
  fixerId: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
    enum: ['plumbing', 'electrical', 'carpentry', 'painting', 'cleaning', 'appliance-repair', 'other']
  },
  price: {
    type: Number,
    required: [true, 'Service price is required'],
    min: [0, 'Price cannot be negative']
  },
  duration: {
    type: Number,
    required: [true, 'Service duration is required'],
    min: [15, 'Duration must be at least 15 minutes']
  },
  fixerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Fixer ID is required']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

serviceSchema.index({ fixerId: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ isActive: 1 });

export default mongoose.model<IService>('Service', serviceSchema);