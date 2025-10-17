import { Express } from "express";

export const registerRoutes = (app: Express) : void => {

      // Health check
  app.get("/health", (_, res) => {
    res.json({
      success: true,
      message: "FixMate-lite API is running...",
      timestamp: new Date().toISOString()
    });
  });

}