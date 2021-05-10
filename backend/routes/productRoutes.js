import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct
} from '../controllers/productContoroller.js'
import { protect, admin } from '../middleware/authMiddkeware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)



export default router