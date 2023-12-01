import express, { Request, Response } from 'express';
import tmdb_route from './routes/tmdb_route';

const app = express();
const PORT = process.env.PORT || 8081;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use('/tmdb', tmdb_route)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
