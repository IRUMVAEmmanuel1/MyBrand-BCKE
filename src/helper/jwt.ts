import { sign,verify } from "jsonwebtoken";
import {  Request,Response, NextFunction} from "express";
import user from "../models/user";
// import user from "../models/user";
const createToken = (user:any) => {
const accessToken = sign({ email:user.email},"whatyouseeiswhatyouget")
return accessToken;
}

const tokenValidation  = async (req:any,res:Response,next:NextFunction) => {
    const accessToken  = req.cookies["access-token"];
    if(!accessToken){
        return res.status(400).json({error:" Login with your account First"})
    }else{
        try{
            let authenticated:any;
            const validToken = verify(accessToken,"whatyouseeiswhatyouget");
            if(validToken){
                //@ts-ignore
                const users= await user.findOne({email:validToken.email})
                authenticated = true
                req.currentUser=users
                return next();
            }
        }catch(err:any){
            return res.status(400).json({error:err}); 
        }
    }
}
export default {
    createToken,
     tokenValidation
    };