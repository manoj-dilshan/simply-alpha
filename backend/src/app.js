import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import routes
import authRoutes from "./routes/auth.route.js";

const app = express();

// --------------------
// Middleware
// --------------------
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// --------------------
// API Routes
// --------------------
app.use("/api/auth", authRoutes);

// --------------------
// Health check
// --------------------
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend running!" });
});

export default app;
