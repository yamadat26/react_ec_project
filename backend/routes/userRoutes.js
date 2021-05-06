import express from 'express'
const router = express.Router()
import {
  authUser,
  resisterUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddkeware.js'

router.route('/').post(resisterUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUser)

export default router