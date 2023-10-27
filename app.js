require('dotenv').config();
require('express-async-errors');

// Extra Security
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();

const authenticateAccount = require('./middleware/authentication');
const isTokenBlacklisted = require('./middleware/isBlacklisted');

const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productsRoute');
const orderRouter = require('./routes/orderRoute');

const connectDb = require('./db/connect');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.set('trust proxy', 1);
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000, //15 minutes
		max: 100, // limit each IP to 100 requests per windowMs
	}),
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', authenticateAccount, productRouter);
app.use('/api/v1/order', authenticateAccount, orderRouter);

// custom middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

// Start the Express app
const start = async () => {
	try {
		await connectDb(process.env.MONGO_URI);
		app.listen(port, () => console.log(`server is listening to ${port}`));
	} catch (error) {
		console.log(error);
	}
};
start();
