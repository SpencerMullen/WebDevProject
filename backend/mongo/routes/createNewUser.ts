import { UserType } from "../../types/user";
import model from "../model";

async function createNewUser(userData: any) {
    const newUserType: UserType = userData.userType === "admin" ? UserType.ADMIN : UserType.USER;
    const newUser = new model({
            _id: userData._id,
            username: userData.username,
            password: userData.password,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            userType: newUserType,
            profilePicLink: userData.profilePicLink,
            genreList: [],
            favoriteMovies: [],
            watchList: [],
            ratedMovies: [],
            ratedMoviesId: [],
            favoriteMoviesId: [],
            watchListId: [],
    });
    try {
        const savedUser = await newUser.save();
        console.log('User saved successfully');
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; 
    }
}

export default createNewUser;