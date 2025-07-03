import express from "express";
import {
    signup,
    verification,
    login,
    checkAuth,
    updateName,
    updateImage,
    updatePassword
} from '../controllers/auth.controller.js'

const router=express.Router()

router.post('/signup',signup)
router.post('/verify',verification)
router.post('/login',login)
router.get('/check-auth',checkAuth)
router.put('/update-password',updatePassword);
router.put('/update-name',updateName);
router.put('/update-image',updateImage);


export default router