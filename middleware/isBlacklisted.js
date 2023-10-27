const BlacklistToken = require('../models/BlacklistToken');
const jwt = require('jsonwebtoken');

const isTokenBlacklisted = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) {
			return res.status(401).json({ message: 'No token provided' });
		}

		const isBlacklisted = await BlacklistToken.exists({ token });
		if (isBlacklisted) {
			return res.status(401).json({ message: 'Token is blacklisted' });
		}

		next();
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};
module.exports = isTokenBlacklisted;
