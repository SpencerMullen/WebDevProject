export type User = {

    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    userType: UserType;
    genreList: string[],
    favoriteMovies: string[],
    watchList: string[],
    ratedMovies: string[],
    ratedMoviesId: string[],
    favoriteMoviesId: string[],
    watchListId: string[],
};

export enum UserType {

    ADMIN = 'ADMIN',
    USER = 'USER',

};
