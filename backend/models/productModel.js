import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:"Category",
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String,
    }
},{timestamps:true})

export default mongoose.model("Product",productSchema)


