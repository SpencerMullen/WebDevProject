import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import tmdb_route from './routes/tmdb_route';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

app.get('/', (req: Request, res: Response) => {
  res.send('Nothing to see here!');
});
app.use('/tmdb', tmdb_route)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
