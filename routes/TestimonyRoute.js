import express from "express"
import {
    getTestimony,
    getTestimonyById,
    saveTestimony,
    updateTestimony,
    deleteTestimony
} from "../controller/TestimonyController.js"

const router = express.Router()

router.get('/testimony', getTestimony)
router.get('/testimony/:id', getTestimonyById)
router.post('/testimony', saveTestimony)
router.patch('/testimony/:id', updateTestimony)
router.delete('/testimony/:id', deleteTestimony)

export default router