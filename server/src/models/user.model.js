import mongoose from "mongoose";

const {Schema}=mongoose

const userSchema=new Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAuth:{
        type:Boolean,
        default:false
    },
    image:{
        type:String,
        default:''
    },
    otp:{
        type:String,
        default:'000000'
    }
},{
    timestamps:true
})

const userModel = mongoose.model("users",userSchema)

export default userModel