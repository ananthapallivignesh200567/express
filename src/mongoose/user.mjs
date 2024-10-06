import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
        },
        displayName:{
            type:String,
        },
        password:{
            type:String,
            required:true
        }
    }
)
export const User=mongoose.model("userSchema",userSchema);