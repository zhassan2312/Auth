
import bcrypt from 'bcryptjs'
import userModel from '../models/user.model.js'
import sendEmail from '../utils/sendEmail.js'
import otp from 'otp-generator'

const signup=async(req,res)=>{
    try{
        
        const {fullName,email,password}=req.body
        
        // Check if user already exists
        const existingUser = await userModel.findOne({email:email});
        if(existingUser) {return res.status(409);}
        
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
        
        
        return res.status(201).json(user)
    }
    catch(err){
        console.error('Signup error:', err);
        return res.status(500).json(err)
    }
}

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        

        const user = await userModel.findOne({email}); // Added await
        if(!user) return res.status(404)
        if(user.isAuth===false) return res.status(401)
        
        // Fixed bcrypt comparison logic
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(402)
        
        // Save user data in session
        req.session.user = {
            id:user._id,
            email: user.email,
            fullName: user.fullName,
            isAuth: true
        };

        return res.status(200).json(user);

    }
    catch(err){
        console.error('Login error:', err);
        return res.status(500).json(err)
    }
}

const verification=async(req,res)=>{
    try{
        const {otp,email} = req.body;

        const user = await userModel.findOne({email});

        if(user.isAuth){
            return res.status(409);
        }
        if (!user) {
            return res.status(404)
        }

        if (!user.otp) {
            return res.status(400)
        }

        if (user.otp !== otp) {
            return res.status(401)
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

        return res.status(200).json(user);

    }
    catch(err){
        console.error('Verification error:', err);
        return res.status(500).json(err)
    }
}

const checkAuth=async(req,res)=>{
    try{
        // Add safety check for session
        if(!req.session.user?.id) {
            return res.status(401)
        }
        
        const user = await userModel.findById(req.session.user.id).select('-password -otp');
        if(!user) {
            return res.status(404)
        }
        
        return res.status(200).json(user);
    }
    catch(err){
        console.error('CheckAuth error:', err);
        return res.status(500).json(err);
    }
}

const updateImage=async(req,res)=>{
    try{
        const {image}=req.body;
        
        // Add safety check for session
        if(!req.session.user?.id) {
            return res.status(401)
        }
        
        const user = await userModel.findById(req.session.user.id); // Added await
        if(!user) {
            return res.status(404)
        }
        
        await user.updateOne({image}); // Added await
    
        
        return res.status(200).json(user);
    }
    catch(err){
        console.error('UpdateImage error:', err);
        return res.status(500).json(err);
    }
}

const updateName=async(req,res)=>{
    try{
        const {name}=req.body;
        
        // Add safety check for session
        if(!req.session.user?.id) {
            return res.status(401);
        }
        
        const user = await userModel.findById(req.session.user.id); // Added await
        if(!user) {
            return res.status(404)
        }
        
        await user.updateOne({fullName: name}); // Added await
        
        // Update session with new name
        req.session.user.fullName = name;
        
        return res.status(200).json(user);
    }
    catch(err){
        console.error('UpdateName error:', err);
        return res.status(500).json(err);
    }
}

const updatePassword=async(req,res)=>{
    try{
        const {currentPassword, newPassword}=req.body;
        
        // Add safety check for session
        if(!req.session.user?.id) {
            return res.status(401)
        }
        
        if(!currentPassword || !newPassword) {
            return res.status(400)
        }
        const user = await userModel.findById(req.session.user.id); // Added await
        if(!user) {
            return res.status(404)
        }
        
        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if(!isCurrentPasswordValid) {
            return res.status(406)
        }
        
        // Hash new password
        const salt = bcrypt.genSaltSync(10);
        const hashedNewPassword = bcrypt.hashSync(newPassword, salt);
        
        await user.updateOne({password: hashedNewPassword}); // Added await
        
        return res.status(200).json(user);
    }
    catch(err){
        console.error('UpdatePassword error:', err);
        return res.status(500).json({message: `Internal Server Error: ${err.message}`});
    }
}

// Add logout function
const logout = async(req, res) => {
    try {
        req.session.destroy((err) => {
            if(err) {
                return res.status(500)
            }
            res.clearCookie('connect.sid'); // Clear session cookie
            return res.status(200)
        });
    }
    catch(err) {
        console.error('Logout error:', err);
        return res.status(500).json(err);
    }
}

// Fix deleteUser function
const deleteUser = async(req, res) => {
    try {
        if(!req.session.user?.id) {
            return res.status(401)
        }
        
        await userModel.findByIdAndDelete(req.session.user.id);
        
        // Destroy session after deleting user
        req.session.destroy();
        
        return res.status(200)
    } catch(err) {
        console.error('DeleteUser error:', err);
        return res.status(500).json(err);
    }
}

const resendVerificationCode = async(req, res) => {
    try {
        const {email} = req.body;

        const user = await userModel.findOne({email});
        if(!user) return res.status(404);

        const genOTP = otp.generate(6, { upperCaseAlphabets: false, specialChars: false });
        await sendEmail(email, genOTP);
        
        user.otp = genOTP;
        await user.save();
        
        return res.status(200).json(user);
    } catch(err) {
        console.error('ResendVerification error:', err);
        return res.status(500).json(err);
    }
}



export {signup, login, verification, updateImage, updateName, updatePassword, checkAuth, logout,deleteUser,resendVerificationCode}