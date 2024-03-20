import express,{Request,Response} from "express";
import comentsControler from '../controller/coments.controler';
const comentRoutes = express.Router();
//coments routes
comentRoutes.post("/:id/comments",comentsControler.createComents);
comentRoutes.get("/:id/comments",comentsControler.getComentBasedOnBlogId);

export default comentRoutes;