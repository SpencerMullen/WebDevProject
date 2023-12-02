export type Movie = {
    title: string;
    genre: string[];
    year: number;
    rating: number;
    director: string;
    description: string;
    image: string;
    id: number;
}

export type Show = {
    title: string;
    genre: string[];
    year: number;
    rating: number;
    director: string;
    description: string;
    image: string;
    id: number;
}

export type User = {
    profilePic: string | undefined;
    username: string;
    password: string;
    email: string;
    role: string;
    likedMovies: number[];
    likedShows: number[];
    id: number;
}