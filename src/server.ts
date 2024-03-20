import express, {Request, Response} from 'express';
import connectDB from './config/db';
import cors from 'cors';
import dotenv from 'dotenv'; 
import cookieParser from "cookie-parser";
export const app = express();
import blogRoute from './route/blogRoute';
import commentsRoutes from "./route/commentsRoutes";
import likeRoutes from './route/likeRoutes';
import querriesRoutes from './route/querriesRoutes';
import usersRoutes from './route/usersRoutes';


// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
dotenv.config();
// Routes
app.use('/api', blogRoute);
app.use('/api/v1', usersRoutes);
app.use("/api/blog", commentsRoutes);
app.use("/api/blog", likeRoutes);
app.use("/api", querriesRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


