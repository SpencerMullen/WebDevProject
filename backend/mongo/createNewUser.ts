import UserSchema from "../schemas/userSchema";
import { UserType } from "../types/user";

async function createNewUser(userData: any) {
    const newUserType: UserType = userData.userType === "admin" ? UserType.ADMIN : UserType.USER;
    const newUser = new UserSchema({
            username: userData.username,
            password: userData.password,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            userType: newUserType,
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
        return savedUser; 
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; 
    }
}

export default createNewUser;