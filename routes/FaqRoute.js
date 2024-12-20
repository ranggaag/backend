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
router.post('/faq', saveFaq)
router.patch('/faq/:id', updateFaq)
router.delete('/faq/:id', deleteFaq)

export default router
