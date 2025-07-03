import {validateEmail,validatePassword} from '../utils/utils.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'

const signup=async(req,res)=>{
    
    try{
        if (!req.body) {
            return res.status(400).json({ message: 'Request body is missing' });
        }
        
        const {fullName,email,password}=req.body
        if(!fullName) return res.status(406).json({ message: 'Name is Missing!' });
        const emailErrors=validateEmail(email)
        const passwordErrors=validatePassword(password)
        if(emailErrors>0) return res.status(406).json({message:emailErrors});
        if(passwordErrors>0) return res.status(406).json({message:passwordErrors});
       
        const salt =bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password,salt)

        const user=new userModel({
            fullName:fullName,
            email:email,
            password:hashedPassword,
            image:"",
            isAuth:false
        })

        await user.save()
        res.status(203).json({message:"Please Verify Your Email"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:`Internal Server Error ${err}`})
    }
}


const login=async(req,res)=>{
    try{

    }
    catch(err){

    }

}

const verification=async(req,res)=>{
     try{

    }
    catch(err){

    }

}

const checkAuth=async(req,res)=>{
 try{

    }
    catch(err){

    }
}

const updateImage=async(req,res)=>{
 try{

    }
    catch(err){

    }
}

const updateName=async(req,res)=>{
 try{

    }
    catch(err){

    }
}

const updatePassword=async(req,res)=>{
 try{

    }
    catch(err){

    }
}

export {signup,login,verification,updateImage,updateName,updatePassword,checkAuth}