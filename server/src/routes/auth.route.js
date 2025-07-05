import express from "express";
import {
    signup,
    verification,
    login,
    checkAuth,
    updateName,
    updateImage,
    updatePassword,
    deleteUser,
    logout,
    resendVerificationCode
} from '../controllers/auth.controller.js'

const router=express.Router()

router.post('/signup',signup)
router.post('/verify',verification)
router.post('/login',login)
router.get('/check-auth',checkAuth)
router.put('/update-password',updatePassword);
router.put('/update-name',updateName);
router.put('/update-image',updateImage);
router.delete('/delete-user',deleteUser);
router.post('/logout',logout); // Changed from GET to POST
router.put('/resend-verification',resendVerificationCode)


export default router