const express = require('express');
const router = express.Router();
const {
	createProduct,
	getAllProduct,
	getSingleProduct,
	deleteProduct,
	updateProduct,
} = require('../controllers/productsController');
router.route('/').post(createProduct).get(getAllProduct);
router
	.route('/:id')
	.get(getSingleProduct)
	.delete(deleteProduct)
	.patch(updateProduct);
module.exports = router;
