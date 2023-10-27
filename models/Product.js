const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	sizes: {
		small: Number,
		medium: Number,
		large: Number,
	},
	colors: [{ type: String }],
	flavours: [{ type: String }],
	images: [{ type: String }],
});

module.exports = mongoose.model('Product', ProductSchema);

// product_id (Unique product identifier)
// name (Product name)
// description (Product description)
// category (Product category, e.g., men's clothing, women's clothing, accessories)
// price (Product price)
// sizes (Array of available sizes)
// colors (Array of available colors)
// images (Array of image URLs)
// stock_quantity (Number of items in stock)
// reviews (Array of product reviews)
