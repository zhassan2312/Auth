import {validateEmail,validatePassword} from '../utils/utils.js'
import bcrypt from 'bcryptjs'
import userModel from '../models/user.model.js'
import sendEmail from '../utils/sendEmail.js'
import otp from 'otp-generator'

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
        const genOTP=otp.generate(6)

        sendEmail(email,genOTP)

        const user=new userModel({
            fullName:fullName,
            email:email,
            password:hashedPassword,
            image:"",
            isAuth:false,
            otp:genOTP
        })


        await user.save()
        res.status(203).json({message:"Please Verify Your Email"})
    }
    catch(err){
        res.status(500).json({message:`Internal Server Error ${err}`})
    }
}


const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const emailErrors=validateEmail(email);
        const passwordErrors=validatePassword(password);
        if(emailErrors.length>0) return res.status(406).json({message:emailErrors});
        if(passwordErrors.length>0) return res.status(406).json({message:passwordErrors});

        const user = userModel.findOne({email});
        if(!user) return res.status(404).json({message:"user not found"});
        if(user.isAuth===false) return res.status(401).json({message:"Please Verify Your Email!"});
        if(bcrypt.compare(password,user.password)) return res.status(406).status({message:"Password did not match!"})
        // Save user data in session
        req.session.user = {
            id:user._id,
            email: user.email,
            fullName: user.fullName
        };

        return res.status(200).json({message:"User Logged In Successfully!"});

    }
    catch(err){
        res.status(500).json({message: `Internal Server Error: ${err.message}`});
    }

}

const verification=async(req,res)=>{
    try{
        const {otp,email} = req.body;
        
        // Validate input
        if (!otp) return res.status(400).json({ message: "OTP is required!" });
        if (!email) return res.status(400).json({ message: "Email not found!" });

        const user = await userModel.findOne({email:email});

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP." });
        }

        // Verify user and save to session
        user.isAuth = true;
        user.otp = null;
        await user.save();

        // Save user data in session
        req.session.user = {
            id:user._id,
            email: user.email,
            fullName: user.fullName
        };

        return res.status(200).json({ 
            message: "Email verified successfully!"
        });

    }
    catch(err){
        res.status(500).json({message: `Internal Server Error: ${err.message}`});
    }
}

const checkAuth=async(req,res)=>{
    try{
        if(!req.session.user.id) return res.status(404).json({message:"User not found!"});
        res.status(200).json({data:req.user})
    }
    catch(err){
        res.status(500).json({message: `Internal Server Error: ${err.message}`});
    }
}

const updateImage=async(req,res)=>{
    try{
        const {image}=req.body
        if(!req.session.user.id) return res.status(404).json({message:"User not found!"});
        const user=userModel.findById(req.session.user.id);
        user.updateOne({image:image})
        return res.status(202).json({message:"Image is Updated"})
    }
    catch(err){
        res.status(500).json({message: `Internal Server Error: ${err.message}`});
    }
}

const updateName=async(req,res)=>{
    try{
        const {name}=req.body
        if(!req.session.user.id) return res.status(404).json({message:"User not found!"});
        const user=userModel.findById(req.session.user.id);
        user.updateOne({fullName:name})
        return res.status(202).json({message:"Name is Updated"})
    }
    catch(err){
        res.status(500).json({message: `Internal Server Error: ${err.message}`});
    }
}

const updatePassword=async(req,res)=>{
    try{
        const {password}=req.body
        if(!req.session.user.id) return res.status(404).json({message:"User not found!"});
        const user=userModel.findById(req.session.user.id);
        user.updateOne({password:password})
        return res.status(202).json({message:"Password is Updated"})
    }
    catch(err){
        res.status(500).json({message: `Internal Server Error: ${err.message}`});
    }
}

export {signup,login,verification,updateImage,updateName,updatePassword,checkAuth}