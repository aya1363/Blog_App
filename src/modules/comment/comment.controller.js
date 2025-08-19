import { Router } from "express";
import * as commentService from './comment.service.js'

const router = Router()
router.post('/',commentService.createComment)
router.patch('/:commentId',commentService.updateComment)
router.post('/findOrCreate', commentService.findOrCreateComment)
router.get('/search', commentService.searchComment)
router.get('/newest/:postId', commentService.newestComment)
router.get('/details/:id', commentService.commentByPk)
export default router