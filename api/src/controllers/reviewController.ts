import { Request, Response, NextFunction } from 'express';
import BookingModel, { BookingStatus } from '../models/bookingModel';
import UserModel from '../models/userModel';
import ErrorHandler from '../utils/errorHandler';
import { UserRole } from '../types/user';

interface CreateReviewRequest {
  bookingId: string;
  rating: number;
  comment: string;
}

interface ReviewResponse {
  success: boolean;
  message: string;
  review?: any;
}

export const createReview = async (
  req: Request<{}, ReviewResponse, CreateReviewRequest>,
  res: Response<ReviewResponse>,
  next: NextFunction
) => {
  try {
    // Only customers can create reviews
    if (req.user?.role !== UserRole.CUSTOMER) {
      return next(new ErrorHandler('Only customers can create reviews', 403));
    }

    const { bookingId, rating, comment } = req.body;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return next(new ErrorHandler('Rating must be between 1 and 5', 400));
    }

    // Find booking and validate
    const booking = await BookingModel.findById(bookingId);
    if (!booking) {
      return next(new ErrorHandler('Booking not found', 404));
    }

    // Check if customer owns this booking
    if (booking.customerId.toString() !== req.user._id) {
      return next(new ErrorHandler('You can only review your own bookings', 403));
    }

    // Check if booking is completed
    if (booking.status !== BookingStatus.COMPLETED) {
      return next(new ErrorHandler('You can only review completed bookings', 400));
    }

    // Update fixer rating
    await updateFixerRating(booking.fixerId.toString(), rating);

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      review: {
        bookingId,
        rating,
        comment,
        customerId: req.user._id,
        fixerId: booking.fixerId
      }
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to update fixer rating
async function updateFixerRating(fixerId: string, newRating: number) {
  const fixer = await UserModel.findById(fixerId);
  if (!fixer) return;

  const currentRating = (fixer as any).rating || 0;
  const totalJobs = (fixer as any).totalJobs || 0;
  
  // Calculate new average rating
  const updatedRating = totalJobs > 0 
    ? ((currentRating * (totalJobs - 1)) + newRating) / totalJobs
    : newRating;

  await UserModel.findByIdAndUpdate(fixerId, {
    rating: Math.round(updatedRating * 10) / 10 // Round to 1 decimal place
  });
}