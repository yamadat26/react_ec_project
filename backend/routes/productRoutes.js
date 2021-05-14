import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProduct
} from '../controllers/productContoroller.js'
import { protect, admin } from '../middleware/authMiddkeware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.get('/top', getTopProduct)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

router.route('/:id/reviews').post(protect, createProductReview)



export default router