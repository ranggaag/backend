import express from "express"
import {
    getGallery,
    getGalleryById
} from "../controller/GalleryController.js"

const router = express.Router()

router.get('/gallery', getGallery)
router.get('/gallery/:id', getGalleryById)

export default router