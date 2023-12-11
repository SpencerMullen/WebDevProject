import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
import UsersRoutes from './mongo/userRoute';
import MoviesRoutes from './movie/moviesRoute';
import session from "express-session";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8081;

// Add currentUser to session
declare module 'express-session' {
  export interface SessionData {
    currentUser: any;
  }
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173", //change this for deployment
  })
);

app.use(
  session(sessionOptions)
);


UsersRoutes(app);
MoviesRoutes(app);

app.listen(PORT, () => {
  console.clear();
  console.log(`Example app listening at http://localhost:${PORT}`);

  const connectionString = process.env.MONGO_URI as string;
  try {
    mongoose.connect(connectionString).then(() => console.log('Connected to MongoDB'))
  } catch (error) {
    console.error('Could not connect to MongoDB:', error);
  }
});