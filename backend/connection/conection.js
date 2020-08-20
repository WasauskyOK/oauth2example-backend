if(process.env.NODE_ENV ==='development')
{
    require('dotenv').config();
}
import mongoose from "mongoose";

export default mongoose.connect(process.env.MONGO_URI,
    {useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
.then(()=>console.log('db is  running'))
.catch(err=>console.log(`error : ${err}`));
