import { boolean } from 'joi';
import mongoose from 'mongoose';
import { UserSchema } from '../service/blogService';
export interface UserType {
    username?: string,
    email?: string,
    isAdmin?: Boolean,
    password?: string
}
export default mongoose.model("User",UserSchema);