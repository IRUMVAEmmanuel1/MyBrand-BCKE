import express,{Request,Response} from "express";
import comentsControler from '../controller/coments.controler';
import {isLoggedIn} from '../middleware/normalUser'
import Jwt from "../helper/jwt";
const comentRoutes = express.Router();
//coments routes
comentRoutes.post("/:id/comments", isLoggedIn, comentsControler.createComents);
comentRoutes.get("/:id/comments",comentsControler.getComentBasedOnBlogId);

export default comentRoutes;