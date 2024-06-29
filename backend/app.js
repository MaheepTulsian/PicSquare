import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import authRoutes from "./routes/AuthRoutes.js";
import uploadRoutes from "./routes/FileUploadRoute.js";
import dashboardRoutes from "./routes/DashboardRoutes.js";

// import { SpeedInsights } from "@vercel/speed-insights/next"
import connectingDatabase from "./database/Connect.js";

dotenv.config({
  path: "./.env",
});

const app = express();
app.options('*', cors({
  origin: "https://picturesquare.vercel.app",
  credentials: true,
}));

const port = process.env.PORT || 5000;

authRoutes.use(bodyParser.json());
authRoutes.use(bodyParser.urlencoded({ extended: true }));

//JWT
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api", authRoutes);
app.use("/api", uploadRoutes);
app.use("/api", dashboardRoutes);

const start = async () => {
  try {
    await connectingDatabase();  // Ensure database connection is established
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
