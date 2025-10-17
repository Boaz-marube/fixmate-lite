import mongoose, { Schema, Document } from 'mongoose';

export enum BookingStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface IBooking extends Document {
  serviceId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  fixerId: mongoose.Types.ObjectId;
  scheduledDate: Date;
  scheduledTime: string;
  status: BookingStatus;
  customerAddress: string;
  customerPhone: string;
  notes?: string;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>({
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Service ID is required']
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Customer ID is required']
  },
  fixerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Fixer ID is required']
  },
  scheduledDate: {
    type: Date,
    required: [true, 'Scheduled date is required']
  },
  scheduledTime: {
    type: String,
    required: [true, 'Scheduled time is required']
  },
  status: {
    type: String,
    enum: Object.values(BookingStatus),
    default: BookingStatus.PENDING
  },
  customerAddress: {
    type: String,
    required: [true, 'Customer address is required']
  },
  customerPhone: {
    type: String,
    required: [true, 'Customer phone is required']
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Amount cannot be negative']
  }
}, {
  timestamps: true
});

bookingSchema.index({ customerId: 1 });
bookingSchema.index({ fixerId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ scheduledDate: 1 });

export default mongoose.model<IBooking>('Booking', bookingSchema);