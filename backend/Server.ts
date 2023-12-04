import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
import UsersRoutes from './routes/userRoute';
import MoviesRoutes from './routes/moviesRoute';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8081;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Nothing to see here!');
});

UsersRoutes(app);
MoviesRoutes(app);

app.listen(PORT, () => {
  console.clear();
  console.log(`Example app listening at http://localhost:${PORT}`);
  
const connectionString = process.env.MONGO_URI as string;
try {
  mongoose.connect(connectionString).then(() => console.log('Connected to MongoDB'))
} catch(error) {
  console.error('Could not connect to MongoDB:', error);
}
});