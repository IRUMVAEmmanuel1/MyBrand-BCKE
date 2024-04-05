import express from "express";
import connectDB from "./config/db";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
export const app = express();
import blogRoute from "./route/blogRoute";
import commentsRoutes from "./route/commentsRoutes";
import likeRoutes from "./route/likeRoutes";
import querriesRoutes from "./route/querriesRoutes";
import usersRoutes from "./route/usersRoutes";
import swaggerRoutes from "./swagger/swagger";
const server = express.Router();
// Connect to DB
connectDB();

// Middleware

app.use(express.json());
app.use(cors());
app.use(cookieParser());
dotenv.config();

// Routes
app.use("/docs", swaggerRoutes)
app.use("/api", blogRoute);
app.use("/api/v1", usersRoutes);
app.use("/api/blogs", commentsRoutes);
app.use("/api/blogs", likeRoutes);
app.use("/api", querriesRoutes);

// Start the server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

export default server;