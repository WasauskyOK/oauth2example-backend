import mongoose,{Schema} from "mongoose";

export default mongoose.model('User',new Schema({
    IdApp:String,
    username:String,
    photo:String
},{collection:"User"}));