import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import connectDB from './config/connectDB';
import { errorHandlerMiddleware } from './errors';
import notFoundMiddleware from './middleware/notFound';
import authRouter from './routes/authRoutes';
import { StatusCodes } from 'http-status-codes';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/api/v1/health', (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json({ status: 'OK', message: 'API is running' });
});

// Authentication routes
app.use('/api/v1/auth', authRouter);

// Not found and error handler middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

async function startApp() {
	try {
		const mongoUrl = process.env.MONGO_URL;
		if (!mongoUrl) {
			throw new Error('MONGO_URL is not defined');
		}
		await connectDB(mongoUrl);
		app.listen(port, () => console.log(`Server is listening on port ${port}`));
	} catch (error) {
		console.log(error);
	}
}
startApp();
