const Account = require('../models/Account');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
	// check header
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new UnauthenticatedError('Authentication Invalid');
	}
	const token = authHeader.split(' ')[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		// attach the account to the jobs routes
		req.account = { accountId: payload.accountId, name: payload.name };
		next();
	} catch (error) {
		throw new UnauthenticatedError('authentication Invalid');
	}
};

module.exports = auth;
