console.log('express');

import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with ');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
