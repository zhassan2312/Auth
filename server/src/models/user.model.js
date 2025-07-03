import mongoose from "mongoose";

const {Schema}=mongoose

const userSchema=new Schema({
    username:{
        typeof:String,
        required:true,
    },
    email:{
        typeof:String,
        required:true
    },
    password:{
        typeof:String,
        required:true
    },
    isAuth:{
        typeof:Boolean,
        default:false
    },
    image:{
        typeof:String,
        default:''
    }
},{
    timestamps:true
})

const userModel = mongoose.model("users",userSchema)

export default userModel