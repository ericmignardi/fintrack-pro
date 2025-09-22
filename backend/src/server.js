import dotenv from "dotenv";
import prisma from "./config/database.js";
import app from "./app.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

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
