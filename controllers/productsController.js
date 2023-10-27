const Product = require('../models/Product');
const Account = require('../models/Account');
const { StatusCodes } = require('http-status-codes');

const createProduct = async (req, res) => {
	const product = await Product.create({ ...req.body });
	res.status(StatusCodes.CREATED).json({ product });
};

const getAllProduct = async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(StatusCodes.OK).json({ products });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ error });
	}
};
const getSingleProduct = async (req, res) => {
	try {
		const {
			params: { id: accountId, id: productId },
		} = req;
		const product = await Product.findOne({ _id: productId });
		if (!product) {
			res.json({
				statusCode: StatusCodes.NOT_FOUND,
				msg: 'validation error',
			});
		}
		res.status(StatusCodes.OK).json({ product });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ error });
	}
};
const deleteProduct = async (req, res) => {
	try {
		const {
			params: { id: accountId, id: productId },
		} = req;
		const product = await Product.findOneAndDelete({ _id: productId });
		if (!product) {
			res.json({
				statusCode: StatusCodes.NOT_FOUND,
				msg: `validation error, product with :${productId} not found`,
			});
		}
		res.status(StatusCodes.OK).json({
			msg: `Product with :${productId} deleted successfully`,
		});
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ error });
	}
};

const updateProduct = async (req, res) => {
	try {
		const {
			params: { id: accountId, id: productId },
		} = req;
		const updateData = req.body;
		const updatedProduct = await Product.findOneAndUpdate(
			{ _id: productId },
			updateData,
			{ new: true, runValidators: true },
		);
		if (!updatedProduct) {
			res.json({
				statusCode: StatusCodes.NOT_FOUND,
				msg: `validation error, product with :${productId} not found`,
			});
		}
		res.status(StatusCodes.OK).json({ updatedProduct });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ error });
	}
};

module.exports = {
	createProduct,
	getAllProduct,
	getSingleProduct,
	deleteProduct,
	updateProduct,
};
