const Account = require('../models/Account');
const Product = require('../models/Product');
const Order = require('../models/Order');
const BlacklistToken = require('../models/BlacklistToken');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

// const createOrder = async (req, res) => {};

const createOrder = async (req, res) => {
	try {
		// const { order_id, seller, order_date, items, total_price, /* other fields */ } = req.body;

		// const order = new Order({
		//   order_id,
		//   seller,
		//   order_date,
		//   items,
		//   total_price,
		//   /* set other fields accordingly */
		// });
		const order = await Order.create({ ...req.body });

		res.status(StatusCodes.CREATED).json({ order });
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: 'Could not create the order',
		});
	}
};

module.exports = { createOrder };

// //UPDATE ORDER
// const updateOrder = async (req, res) => {
// 	try {
// 		const orderId = req.params.id; // assuming you pass the order ID as a route parameter
// 		const updatedData = req.body;

// 		const updatedOrder = await Order.findOneAndUpdate(
// 			{ order_id: orderId },
// 			updatedData,
// 			{ new: true },
// 		);

// 		if (!updatedOrder) {
// 			return res.status(404).json({ error: 'Order not found' });
// 		}

// 		res.json(updatedOrder);
// 	} catch (error) {
// 		res.status(500).json({ error: 'Could not update the order' });
// 	}
// };

// module.exports = { updateOrder };

// // DELETE ORDER
// const deleteOrder = async (req, res) => {
// 	try {
// 		const orderId = req.params.id; // assuming you pass the order ID as a route parameter

// 		const deletedOrder = await Order.findOneAndDelete({
// 			order_id: orderId,
// 		});

// 		if (!deletedOrder) {
// 			return res.status(404).json({ error: 'Order not found' });
// 		}

// 		res.json(deletedOrder);
// 	} catch (error) {
// 		res.status(500).json({ error: 'Could not delete the order' });
// 	}
// };

// module.exports = { deleteOrder };

// // GET ALL ORDER
// const getAllOrders = async (req, res) => {
// 	try {
// 		const orders = await Order.find();
// 		res.json(orders);
// 	} catch (error) {
// 		res.status(500).json({ error: 'Could not retrieve orders' });
// 	}
// };

// module.exports = { getAllOrders };

// // GET SINGLE ORDER
// const getSingleOrder = async (req, res) => {
// 	try {
// 		const orderId = req.params.id; // assuming you pass the order ID as a route parameter

// 		const order = await Order.findOne({ order_id: orderId });

// 		if (!order) {
// 			return res.status(404).json({ error: 'Order not found' });
// 		}

// 		res.json(order);
// 	} catch (error) {
// 		res.status(500).json({ error: 'Could not retrieve the order' });
// 	}
// };

// module.exports = { getSingleOrder };
