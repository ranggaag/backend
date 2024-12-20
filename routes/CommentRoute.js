import express from "express"
import {
    getComments,
    getCommentById,
    saveComment,
    updateComment,
    deleteComment
} from "../controller/CommentController.js"

const router = express.Router()

router.get('/comments', getComments)
router.get('/comments/:id', getCommentById)
router.post('/comments', saveComment)
router.patch('/comments/:id', updateComment)
router.delete('/comments/:id', deleteComment)

export default router