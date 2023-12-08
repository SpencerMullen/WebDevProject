import UserSchema from "../userSchema";
import { UserType } from "../../types/user";


function editUserData(id: number, userData: any) {
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

    
}

export default editUserData;