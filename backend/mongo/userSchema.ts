import mongoose from 'mongoose';

const user = new mongoose.Schema({
    _id:{
        type: String,
        default: new mongoose.Types.ObjectId()
        },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    firstName: String,
    lastName: String,
    userType: String,
    profilePicLink: String,
    genreList: [String],
    favoriteMovies: [String],
    watchList: [String],
    ratedMovies: [String],
    ratedMoviesId: [String],
    favoriteMoviesId: [String],
    watchListId: [String],
}, 
{ collection: "users" });

export default user;
