import express from "express"
import {
    getFaq,
    getFaqById
} from "../controller/FaqController.js"

const router = express.Router()

router.get('/faq', getFaq)
router.get('/faq/:id', getFaqById)

export default router
