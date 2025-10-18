import { Request, Response, NextFunction } from 'express';
import BookingModel, { BookingStatus } from '../models/bookingModel';
import ServiceModel from '../models/serviceModel';
import UserModel from '../models/userModel';
import ErrorHandler from '../utils/errorHandler';
import { UserRole } from '../types/user';

interface CreateBookingRequest {
  serviceId: string;
  scheduledDate: string;
  scheduledTime: string;
  customerAddress: string;
  customerPhone: string;
  notes?: string;
}

interface BookingResponse {
  success: boolean;
  message: string;
  booking?: any;
  bookings?: any[];
  total?: number;
}

export const createBooking = async (
  req: Request<{}, BookingResponse, CreateBookingRequest>,
  res: Response<BookingResponse>,
  next: NextFunction
) => {
  try {
    // Only customers can create bookings
    if (req.user?.role !== UserRole.CUSTOMER) {
      return next(new ErrorHandler('Only customers can create bookings', 403));
    }

    const { serviceId, scheduledDate, scheduledTime, customerAddress, customerPhone, notes } = req.body;

    // Get service details with fixer info
    const service = await ServiceModel.findById(serviceId).populate('fixerId');
    if (!service) {
      return next(new ErrorHandler('Service not found', 404));
    }

    if (!service.isActive) {
      return next(new ErrorHandler('Service is not available', 400));
    }

    // Validate fixer is active and available
    const fixer = await UserModel.findById(service.fixerId);
    if (!fixer || !fixer.isActive) {
      return next(new ErrorHandler('Fixer is not available', 400));
    }

    if (fixer.role !== UserRole.FIXER) {
      return next(new ErrorHandler('Invalid service provider', 400));
    }

    // Check if fixer is available (optional business rule)
    if (!(fixer as any).isAvailable) {
      return next(new ErrorHandler('Fixer is currently unavailable', 400));
    }

    // Validate booking date is in the future
    const bookingDate = new Date(scheduledDate);
    if (bookingDate <= new Date()) {
      return next(new ErrorHandler('Booking date must be in the future', 400));
    }

    // Check for booking conflicts (same fixer, same date/time)
    const existingBooking = await BookingModel.findOne({
      fixerId: service.fixerId,
      scheduledDate: bookingDate,
      scheduledTime,
      status: { $in: [BookingStatus.PENDING, BookingStatus.ACCEPTED, BookingStatus.IN_PROGRESS] }
    });

    if (existingBooking) {
      return next(new ErrorHandler('Fixer is already booked at this time', 409));
    }

    // Create booking
    const booking = await BookingModel.create({
      serviceId,
      customerId: req.user._id,
      fixerId: service.fixerId,
      scheduledDate: bookingDate,
      scheduledTime,
      customerAddress,
      customerPhone,
      notes,
      totalAmount: service.price,
      status: BookingStatus.PENDING
    });

    const populatedBooking = await BookingModel.findById(booking._id)
      .populate('serviceId', 'title description price duration')
      .populate('fixerId', 'name email phoneNumber');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: populatedBooking
    });
  } catch (error) {
    next(error);
  }
};

export const getBookings = async (
  req: Request,
  res: Response<BookingResponse>,
  next: NextFunction
) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const userId = req.user?._id;
    const userRole = req.user?.role;

    // Build filter based on user role
    const filter: any = {};
    if (userRole === UserRole.CUSTOMER) {
      filter.customerId = userId;
    } else if (userRole === UserRole.FIXER) {
      filter.fixerId = userId;
    }

    if (status) filter.status = status;

    const bookings = await BookingModel.find(filter)
      .populate('serviceId', 'title description price duration')
      .populate('customerId', 'name email phoneNumber')
      .populate('fixerId', 'name email phoneNumber')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await BookingModel.countDocuments(filter);

    res.json({
      success: true,
      message: 'Bookings retrieved successfully',
      bookings,
      total
    });
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (
  req: Request,
  res: Response<BookingResponse>,
  next: NextFunction
) => {
  try {
    const booking = await BookingModel.findById(req.params.id)
      .populate('serviceId', 'title description price duration')
      .populate('customerId', 'name email phoneNumber address')
      .populate('fixerId', 'name email phoneNumber');

    if (!booking) {
      return next(new ErrorHandler('Booking not found', 404));
    }

    // Check if user is authorized to view this booking
    const userId = req.user?._id;
    if (booking.customerId._id.toString() !== userId && booking.fixerId._id.toString() !== userId) {
      return next(new ErrorHandler('Not authorized to view this booking', 403));
    }

    res.json({
      success: true,
      message: 'Booking retrieved successfully',
      booking
    });
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (
  req: Request,
  res: Response<BookingResponse>,
  next: NextFunction
) => {
  try {
    const { status } = req.body;
    const booking = await BookingModel.findById(req.params.id);

    if (!booking) {
      return next(new ErrorHandler('Booking not found', 404));
    }

    // Only fixer can update booking status
    if (booking.fixerId.toString() !== req.user?._id) {
      return next(new ErrorHandler('Only the assigned fixer can update booking status', 403));
    }

    // Validate status transitions
    const validTransitions: { [key: string]: BookingStatus[] } = {
      [BookingStatus.PENDING]: [BookingStatus.ACCEPTED, BookingStatus.CANCELLED],
      [BookingStatus.ACCEPTED]: [BookingStatus.IN_PROGRESS, BookingStatus.CANCELLED],
      [BookingStatus.IN_PROGRESS]: [BookingStatus.COMPLETED, BookingStatus.CANCELLED],
      [BookingStatus.COMPLETED]: [],
      [BookingStatus.CANCELLED]: []
    };

    if (!validTransitions[booking.status].includes(status)) {
      return next(new ErrorHandler(`Cannot change status from ${booking.status} to ${status}`, 400));
    }

    const updatedBooking = await BookingModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('serviceId', 'title description price duration')
     .populate('customerId', 'name email phoneNumber');

    // Update fixer stats when booking is completed
    if (status === BookingStatus.COMPLETED) {
      await UserModel.findByIdAndUpdate(booking.fixerId, {
        $inc: { totalJobs: 1 }
      });
    }

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      booking: updatedBooking
    });
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (
  req: Request,
  res: Response<BookingResponse>,
  next: NextFunction
) => {
  try {
    const booking = await BookingModel.findById(req.params.id);

    if (!booking) {
      return next(new ErrorHandler('Booking not found', 404));
    }

    // Both customer and fixer can cancel
    const userId = req.user?._id;
    if (booking.customerId.toString() !== userId && booking.fixerId.toString() !== userId) {
      return next(new ErrorHandler('Not authorized to cancel this booking', 403));
    }

    // Can only cancel pending or accepted bookings
    if (![BookingStatus.PENDING, BookingStatus.ACCEPTED].includes(booking.status)) {
      return next(new ErrorHandler('Cannot cancel booking in current status', 400));
    }

    const updatedBooking = await BookingModel.findByIdAndUpdate(
      req.params.id,
      { status: BookingStatus.CANCELLED },
      { new: true }
    ).populate('serviceId', 'title description price duration');

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      booking: updatedBooking
    });
  } catch (error) {
    next(error);
  }
};