import mongoose from 'mongoose';

const user = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    firstName: String || "",
    lastName: String || "",
    userType: String,
    profilePicLink: String || "",
    genreList: [String] || [],
    ratedMoviesId: [String] || [],
    favoriteMoviesId: [String] || [],
    watchListId: [String] || [],
}, 
{ collection: "users" });

export default user;
