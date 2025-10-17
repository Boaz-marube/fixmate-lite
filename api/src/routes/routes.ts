import { Express, Request, Response, NextFunction } from "express";
import authRoutes from './authRoutes';

export const registerRoutes = (app: Express) : void => {
  app.use('/api/auth', authRoutes);

   // Health check
   app.get("/health", (_, res) => {
    res.json({
      success: true,
      message: "FixMate-lite API is running...",
      timestamp: new Date().toISOString()
    });
  });
}