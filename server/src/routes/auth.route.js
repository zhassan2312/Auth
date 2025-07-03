import { Router } from "express";
import {signup,verification,login} from '../controllers/auth.controller'

const router=Router()

router.post('/signup',signup)
router.post('/verify',verification)
router.post('/login',login)


export default router