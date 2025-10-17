import { Express } from "express";
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import serviceRoutes from './serviceRoutes';

export const registerRoutes = (app: Express) : void => {
  // Health check
  app.get("/health", (_, res) => {
    res.json({
      success: true,
      message: "FixMate-lite API is running...",
      timestamp: new Date().toISOString()
    });
  });

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/services', serviceRoutes);
}