import mongoose from "mongoose";
const likeScema = new mongoose.Schema({
    
    userId:{type:mongoose.Schema.Types.ObjectId,
    ref: 'user'},
    blogID:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'blog'
    }
})
export default mongoose.model("like",likeScema);