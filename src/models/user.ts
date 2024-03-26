import { boolean } from 'joi';
import mongoose from 'mongoose';
export interface UserType {
    username?: string,
    email?: string,
    isAdmin?: Boolean,
    password?: string
}
const UserSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    isAdmin:{type:Boolean, default:false},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true}
});

export default mongoose.model("User",UserSchema);