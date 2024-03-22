import express from 'express';
import connectDB from './config/db';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import swaggerJsdoc, { Options } from 'swagger-jsdoc'; 
import swaggerUi from 'swagger-ui-express';

export const app = express();

import blogRoute from './route/blogRoute';
import commentsRoutes from './route/commentsRoutes';
import likeRoutes from './route/likeRoutes';
import querriesRoutes from './route/querriesRoutes';
import usersRoutes from './route/usersRoutes';

const options: Options = { 
  definition: {
    openapi: '3.0.0',
    info: { 
      title: '/api-docs', 
      version: '1.0.0',
      description: 'Emmanuel Irumva Brand Restful API Documentation', 
    },
    servers: [
      {
        url: 'http://localhost:5000/',
      },
    ],
  },
  apis: ['../dist/route/*.js'], 
};


// Connect to DB
connectDB();

const spacs = swaggerJsdoc(options);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(spacs)
);



// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
dotenv.config();

// Routes
app.use('/api', blogRoute);
app.use('/api/v1', usersRoutes);
app.use('/api/blog', commentsRoutes);
app.use('/api/blog', likeRoutes);
app.use('/api', querriesRoutes);

app.get("/", (req, res) =>{
  res.status(200).json(("Welcome"))
})
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
