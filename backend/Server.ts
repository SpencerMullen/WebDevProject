import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import tmdb_route from './routes/tmdb_route';
import cors from "cors";
import UsersRoutes from './routes/users';
import MoviesRoutes from './routes/movies';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8081;

app.use(cors());
//app.use('/tmdb', tmdb_route)

app.get('/', (req: Request, res: Response) => {
  res.send('Nothing to see here!');
});

UsersRoutes(app);
MoviesRoutes(app);

app.listen(PORT, () => {
  console.clear();
  console.log(`Example app listening at http://localhost:${PORT}`);
});