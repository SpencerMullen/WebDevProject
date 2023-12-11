import { Movie } from '../../types';
import axios from 'axios';

// example to get movies based on multiple genres:  
// url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28%20%7C%2012',


async function searchByGenre(genre: string[]) {
    const optionsOld = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.MOVIE_API_KEY
        }
    };

    try {
        // console.log('requesting movies by genre...');
        const response = await axios.request(optionsOld);;
        const data = response.data;
        return data.results.map((movie: any) => ({
            title: movie.title,
            genre: movie.genre_ids,
            date: movie.release_date,
            num_rating: movie.vote_count,
            rating: movie.vote_average,
            director: movie.director,
            description: movie.description,
            image: movie.poster_path,
            id: movie.id
        })) as Movie[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default searchByGenre;
