import mongoose from "mongoose";
const querriesSchema = new mongoose.Schema({
	user: { type: String, required: true },
	message: { type: String, required: true },
});
export default mongoose.model("querrie", querriesSchema);
