import { User } from '../types/user';

export const transformToUserType = (doc: any): User => {
    return {
        _id: doc._id,
        username: doc.username,
        password: doc.password,
        email: doc.email,
        firstName: doc.firstName || '', // Default to empty string if null/undefined
        lastName: doc.lastName || '',
        userType: doc.userType,
        profilePicLink: doc.profilePicLink,
        genreList: doc.genreList,
        favoriteMovies: doc.favoriteMovies,
        watchList: doc.watchList,
        ratedMovies: doc.ratedMovies,
        ratedMoviesId: doc.ratedMoviesId,
        favoriteMoviesId: doc.favoriteMoviesId,
        watchListId: doc.watchListId,
    };
};
