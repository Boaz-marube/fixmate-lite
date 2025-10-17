import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();


const envSchema = z.object({
  MONGO_USERNAME: z.string().min(1, "MONGO_USERNAME is required"),
  MONGO_PASSWORD: z.string().min(1, "MONGO_PASSWORD is required"),
  SERVER_PORT: z.string().default("8090").transform(Number), 
  SERVER_ROUNDS: z.string().default("10").transform(Number),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  JWT_EXPIRES_IN: z.string().default('7d'),
  MONGO_URI: z.string().min(1, "MONGO_URL is required"),
});

const env = envSchema.parse(process.env);

export const config = {
  mongo: {
    url: env.MONGO_URI,
  },
  server: {
    port: env.SERVER_PORT,
    rounds: env.SERVER_ROUNDS,
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
   },
};
