import { UserType } from "../../types/user";
import model from "../model";

async function createNewUser(userData: any) {
    const newUserType: UserType = userData.userType === "admin" ? UserType.ADMIN : UserType.USER;
    const newUser = new model({
            username: userData.username,
            password: userData.password,
            email: userData.email,
            firstName: "",
            lastName: "",
            userType: newUserType,
            profilePicLink: "",
            genreList: [],
            ratedMoviesId: [],
            favoriteMoviesId: [],
            watchListId: [],
    });
    try {
        const savedUser = await newUser.save();
        console.log('User saved successfully: ', savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; 
    }
}

export default createNewUser;