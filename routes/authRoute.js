const express = require('express');
const router = express.Router();

const {
	createAccount,
	loginAccount,
	logoutAccount,
} = require('../controllers/authController');
const isTokenBlacklisted = require('../middleware/isBlacklisted');

router.route('/register').post(createAccount);
router.route('/login').post(loginAccount);
router.route('/:id/logout', isTokenBlacklisted).delete(logoutAccount);

module.exports = router;
