import express from "express"
import {
    getFaq,
    getFaqById,
    saveFaq,
    updateFaq,
    deleteFaq

} from "../controller/FaqController.js"

const router = express.Router()

router.get('/faq', getFaq)
router.get('/faq/:id', getFaqById)
router.get('/faq', saveFaq)
router.get('/faq/:id', updateFaq)
router.get('/faq/:id', deleteFaq)

export default router
