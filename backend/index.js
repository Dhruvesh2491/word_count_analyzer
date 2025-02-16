import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import cors from "./config/cors.js";
import insightRoutes from "./routes/insightRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

const _dirname = path.resolve();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors);

// Routes
app.use("/api", insightRoutes);

// Error handling middleware
app.use(errorHandler);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
