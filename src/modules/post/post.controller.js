import { Router } from "express";
import * as postService from "./post.service.js";
const router = Router()
router.post('/', postService.newPost)
router.delete('/:postId', postService.softDelete) 
router.get('/details', postService.allPosts)
router.get('/comment-count', postService.commentCount)
export default router