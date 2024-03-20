import mongoose from "mongoose";
const comentsSchema = new mongoose.Schema({
    user:{type:String,required:true},
    coment:{type:String,required:true},
    blogID:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'blog'
      }
})
export default mongoose.model("coment",comentsSchema);