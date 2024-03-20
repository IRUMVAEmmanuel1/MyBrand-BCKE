import express, {Request, Response} from 'express';
import blogRoute from './blogRoute';
import comentsRoutes from "./commentsRoutes"
import likeRoutes from './likeRoutes';
import querriesRoutes from './querriesRoutes';
import usersRoutes from './usersRoutes';
const router = express.Router();
router.use('/blogs',blogRoute);
router.use("/blogs",comentsRoutes);
router.use("/blogs",likeRoutes);
router.use("/mybrand",querriesRoutes);
router.use("/mybrand",usersRoutes);
export default router;