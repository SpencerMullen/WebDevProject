type Movie = {
    title: string;
    genre: string;
    date: string,
    num_rating: number,
    rating: number,
    director: string;
    description: string;
    image: string;
    id: number;
};


type Show = {
    title: string;
    genre: string[];
    year: number;
    rating: number;
    director: string;
    description: string;
    image: string;
    id: number;
}

type User = {
    profilePic: string | undefined;
    username: string;
    password: string;
    email: string;
    // an array of movie ids that automatically converts ints to strings
    genreList: number[] | string[];
    likedMovies: number[] | string[];
    likedShows: number[];
    id: number;
}

type Genre = {
    name: string;
    id: number;
}

export type { Movie, Show, User, Genre };

