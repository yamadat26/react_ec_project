import express from 'express'
const router = express.Router()
import { authUser, resisterUser, getUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddkeware.js'

router.route('/').post(resisterUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)

export default router