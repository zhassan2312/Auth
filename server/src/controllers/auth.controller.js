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
        if(emailErrors.length > 0) return res.status(406).json({message:emailErrors});
        if(passwordErrors.length > 0) return res.status(406).json({message:passwordErrors});
        
        // Check if user already exists
        const existingUser = await userModel.findOne({email});
        if(existingUser) return res.status(409).json({message:"User already exists!"});
        
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password,salt)
        const genOTP = otp.generate(6, { upperCaseAlphabets: false, specialChars: false });

        await sendEmail(email,genOTP);

        const user=new userModel({
            fullName,
            email,
            password:hashedPassword,
            image:"",
            isAuth:false,
            otp:genOTP
        })

        await user.save()
        
        // Save user to session for verification
        req.session.user = {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            isAuth: false
        };
        
        res.status(201).json({message:"Please Verify Your Email"})
    }
    catch(err){
        console.error('Signup error:', err);
        res.status(500).json({message:`Internal Server Error: ${err.message}`})
    }
}

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        
        if(!email || !password) {
            return res.status(400).json({message:"Email and password are required"});
        }
        
        const emailErrors=validateEmail(email);
        const passwordErrors=validatePassword(password);
        if(emailErrors.length>0) return res.status(406).json({message:emailErrors});
        if(passwordErrors.length>0) return res.status(406).json({message:passwordErrors});

        const user = await userModel.findOne({email}); // Added await
        if(!user) return res.status(404).json({message:"User not found"});
        if(user.isAuth===false) return res.status(401).json({message:"Please Verify Your Email!"});
        
        // Fixed bcrypt comparison logic
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(401).json({message:"Invalid credentials"});
        
        // Save user data in session
        req.session.user = {
            id:user._id,
            email: user.email,
            fullName: user.fullName,
            isAuth: true
        };

        return res.status(200).json({
            message:"User Logged In Successfully!",
            data: user
        });

    }
    catch(err){
        console.error('Login error:', err);
        res.status(500).json({message: `Internal Server Error: ${err.message}`});
    }
}

const verification=async(req,res)=>{
    try{
        const {otp,email} = req.body;
        
        // Validate input
        if (!otp) return res.status(400).json({ message: "OTP is required!" });
        if (!email) return res.status(400).json({ message: "Email is required!" });

        const user = await userModel.findOne({email});

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (!user.otp) {
            return res.status(400).json({ message: "OTP has expired or already used." });
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
            fullName: user.fullName,
            isAuth: true
        };

        return res.status(200).json({ 
            message: "Email verified successfully!",
            data: user
        });

    }
    catch(err){
        console.error('Verification error:', err);
        res.status(500).json({message: `Internal Server Error: ${err.message}`});
    }
}

const checkAuth=async(req,res)=>{
    try{
        // Add safety check for session
        if(!req.session.user?.id) {
            return res.status(401).json({message:"Not authenticated"});
        }
        
        const user = await userModel.findById(req.session.user.id).select('-password -otp');
        if(!user) {
            return res.status(404).json({message:"User not found"});
        }
        
        res.status(200).json({message:"User is Authorized!",
            data: user
        });
    }
    catch(err){
        console.error('CheckAuth error:', err);
        res.status(500).json({message: `Internal Server Error: ${err.message}`});
    }
}

const updateImage=async(req,res)=>{
    try{
        const {image}=req.body;
        
        // Add safety check for session
        if(!req.session.user?.id) {
            return res.status(401).json({message:"Not authenticated"});
        }
        
        if(!image) {
            return res.status(400).json({message:"Image URL is required"});
        }
        
        const user = await userModel.findById(req.session.user.id); // Added await
        if(!user) {
            return res.status(404).json({message:"User not found"});
        }
        
        await user.updateOne({image}); // Added await
        
        // Update session with new image
        req.session.user.image = image;
        
        return res.status(200).json({message:"Image updated successfully",data:user});
    }
    catch(err){
        console.error('UpdateImage error:', err);
        res.status(500).json({message: `Internal Server Error: ${err.message}`});
    }
}

const updateName=async(req,res)=>{
    try{
        const {name}=req.body;
        
        // Add safety check for session
        if(!req.session.user?.id) {
            return res.status(401).json({message:"Not authenticated"});
        }
        
        if(!name) {
            return res.status(400).json({message:"Name is required"});
        }
        
        const user = await userModel.findById(req.session.user.id); // Added await
        if(!user) {
            return res.status(404).json({message:"User not found"});
        }
        
        await user.updateOne({fullName: name}); // Added await
        
        // Update session with new name
        req.session.user.fullName = name;
        
        return res.status(200).json({message:"Name updated successfully",data:user});
    }
    catch(err){
        console.error('UpdateName error:', err);
        res.status(500).json({message: `Internal Server Error: ${err.message}`});
    }
}

const updatePassword=async(req,res)=>{
    try{
        const {currentPassword, newPassword}=req.body;
        
        // Add safety check for session
        if(!req.session.user?.id) {
            return res.status(401).json({message:"Not authenticated"});
        }
        
        if(!currentPassword || !newPassword) {
            return res.status(400).json({message:"Current password and new password are required"});
        }
        
        // Validate new password
        const passwordErrors = validatePassword(newPassword);
        if(passwordErrors.length > 0) {
            return res.status(406).json({message: passwordErrors});
        }
        
        const user = await userModel.findById(req.session.user.id); // Added await
        if(!user) {
            return res.status(404).json({message:"User not found"});
        }
        
        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if(!isCurrentPasswordValid) {
            return res.status(401).json({message:"Current password is incorrect"});
        }
        
        // Hash new password
        const salt = bcrypt.genSaltSync(10);
        const hashedNewPassword = bcrypt.hashSync(newPassword, salt);
        
        await user.updateOne({password: hashedNewPassword}); // Added await
        
        return res.status(200).json({message:"Password updated successfully",data:user});
    }
    catch(err){
        console.error('UpdatePassword error:', err);
        res.status(500).json({message: `Internal Server Error: ${err.message}`});
    }
}

// Add logout function
const logout = async(req, res) => {
    try {
        req.session.destroy((err) => {
            if(err) {
                return res.status(500).json({message: "Could not log out"});
            }
            res.clearCookie('connect.sid'); // Clear session cookie
            return res.status(200).json({message: "Logged out successfully"});
        });
    }
    catch(err) {
        console.error('Logout error:', err);
        res.status(500).json({message: `Internal Server Error: ${err.message}`});
    }
}

const deleteUser=()=>{
    try{
        userModel.findByIdAndDelete(req.session.user.id)
        res.status(202).json({message:"User is deleted!"})

    }catch(err){
        res.status(500).json({message: `Internal Server Error: ${err.message}`});
    }

}



export {signup, login, verification, updateImage, updateName, updatePassword, checkAuth, logout,deleteUser}