import express from "express"
import { saveRegister } from "../dashoardController/RegisterController.js"
import { saveLogin } from "../dashoardController/LoginController.js"

const router = express.Router()

router.post('/register', saveRegister)
router.post('/login', saveLogin)


export default router