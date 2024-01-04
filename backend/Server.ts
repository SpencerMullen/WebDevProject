import express from 'express';
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

let frontendURL = process.env.FRONTEND_URL_LOCAL as string; 
if (process.env.NODE_ENV == 'production') {
  frontendURL = process.env.FRONTEND_URL_PROD as string;
}
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
app.use(
  cors({
    credentials: true,
    origin: frontendURL,
  })
);

app.use(
  session(sessionOptions)
);

UsersRoutes(app);
MoviesRoutes(app);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  const connectionString = process.env.MONGO_CLOUD as string;
  try {
    mongoose.connect(connectionString).then(() => console.log('Connected to MongoDB'))
  } catch (error) {
    console.error('Could not connect to MongoDB:', error);
  }
});