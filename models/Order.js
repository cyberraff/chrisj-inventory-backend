const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
	},
	quantity: Number,
});

const orderSchema = new mongoose.Schema({
	order_id: {
		type: String,
		unique: true,
	},
	seller: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Account',
	},
	order_date: Date,
	items: [orderItemSchema],
	totalPrice: Number,

	// Other order-specific fields (e.g., order status, payment method, etc.)
});

module.exports = mongoose.model('Order', orderSchema);
