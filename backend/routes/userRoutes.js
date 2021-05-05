import express from 'express'
const router = express.Router()
import { authUser, resisterUser, getUserProfile, updateUserProfile, getUsers } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddkeware.js'

router.route('/').post(resisterUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router