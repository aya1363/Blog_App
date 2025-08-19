
import { Router } from 'express'
import * as userService from './user.service.js'
const router = Router()

router.post('/signup', userService.signup)
router.put('/:id', userService.updateUserPk)
router.get('/by-email', userService.findUserEmail)
router.get('/:id', userService.getUserPk)

export default router