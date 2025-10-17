import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "./config/config";
import { registerRoutes } from "./routes/routes";

const PORT = Number(process.env.PORT) || config.server.port
const app: Express = express();

app.use(express.json());
app.use(cors({
  credentials: true
}));

(async function startUp() {
  try {
    await mongoose.connect(config.mongo.url, {
      w: "majority",
      retryWrites: true,
      authMechanism: "DEFAULT",
    } as any);

    console.log("✅ Connection to MongoDB successful");

    registerRoutes(app);

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error("❌ Could not connect to the database", error);
    process.exit(1);
  }
})();
