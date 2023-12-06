import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
import UsersRoutes from './routes/userRoute';
import MoviesRoutes from './routes/moviesRoute';
import session from "express-session";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8081;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173", //change this for deployment
  })
 );
 
app.use(express.json())
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
app.use(
  session(sessionOptions)
);

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