import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async(req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
  } = req.body

  if(orderItems && orderItems.length === 0 ) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    })

    const createdOrder = await order.save()

    res.status(201).json({createdOrder})
  }

})

// @desc Get Order By ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async(req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if(order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async(req, res) => {
  const order = await Order.findById(req.params.id)

  if(order) {
    order.isPaid = true
    order.paidAt = Date.now()

    // This comes from paypal api
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)

  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Update order to deliveres
// @route GET /api/orders/:id/deliver
// @access Private/Admin
const updateOrderTodelivered = asyncHandler(async(req, res) => {
  const order = await Order.findById(req.params.id)

  if(order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)

  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async(req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
  
})

// @desc Get all orders
// @route GET /api/orders
// @access Private/admin
const getOrders = asyncHandler(async(req, res) => {
  const orders = await Order.find({  }).populate('user', 'id name')
  res.json(orders)
  
})


export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderTodelivered,
  getMyOrders,
  getOrders,
}