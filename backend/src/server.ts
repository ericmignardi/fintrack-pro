import cors from "cors";
import express, { Application } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import prisma from "./config/database";
import authRoutes from "./routes/authRoute";

dotenv.config();

const PORT: number = parseInt(process.env.PORT || "5000");
const app: Application = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed: ", error);
    process.exit(1);
  }
};

startServer();
