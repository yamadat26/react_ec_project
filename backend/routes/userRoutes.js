import express from 'express'
const router = express.Router()
import { authUser, resisterUser, getUserProfile, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddkeware.js'

router.route('/').post(resisterUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router