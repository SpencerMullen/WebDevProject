import UserSchema from "../schemas/userSchema";
import { UserType } from "../types/user";

async function createNewUser(userData: any) {
    const newUser = new UserSchema({
            
            username: userData.username,
            password: userData.password,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            userType: UserType.USER,
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
        console.log('User created successfully');
        return savedUser; 
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; 
    }
}

export default createNewUser;