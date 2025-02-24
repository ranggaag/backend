import express from "express"
import { getMenu } from "../controller/MenuController.js"

const router = express.Router()

router.get('/menu', getMenu)

export default router

