// const mongoose = require('mongoose');
const Account = require('../models/Account');
const BlacklistToken = require('../models/BlacklistToken');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const createAccount = async (req, res) => {
	const account = await Account.create({ ...req.body });
	const token = account.createJWT();

	res.status(StatusCodes.CREATED).json({
		token,
		account,
		message: 'Account created ',
	});
};
//LOGIN
const loginAccount = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequestError('please provide email and password');
	}
	const account = await Account.findOne({ email });
	if (!account) {
		throw new UnauthenticatedError('Invalid Credentials');
	}

	const isPasswordCorrect = await account.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError('Invalid Credentials');
	}

	const token = account.createJWT();
	res.status(StatusCodes.OK).json({
		token,
		account: { name: account.name },
		message: 'account logged in',
	});
};
// Route to handle logout (add the token to the blacklist)

const logoutAccount = async (req, res) => {
	try {
		const {
			params: { id: accountId },
		} = req;

		const account = await Account.findOne({ _id: accountId });
		if (!account) {
			res.json({
				statusCode: StatusCodes.NOT_FOUND,
				msg: 'validation error',
			});
		}
	} catch (error) {
		// Handle the error here
		res.json({
			statusCode: StatusCodes.NOT_FOUND,
			msg: error.message,
		});
	}
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		return res.status(400).json({
			statusCode: StatusCodes.UNAUTHORIZED,
			errors: {
				resource: req.body,
				message: 'Not Authorized',
			},
		});
	}
	await BlacklistToken.create({ token });
	res.json({ message: 'Logged out successfully' });
};

module.exports = { createAccount, loginAccount, logoutAccount };
