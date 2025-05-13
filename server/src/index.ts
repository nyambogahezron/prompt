import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import connectDB from './config/connectDB';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with ');
});

async function startApp() {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error('MONGO_URL is not defined');
    }
    await connectDB(mongoUrl);
    app.listen(port, () => console.log(`Server is listen on port ${port}`));
  } catch (error) {
    console.log(error);
  }
}
startApp();
