import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 8081;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
