import { Movie } from '../types';
import axios from 'axios';

// example to get movies based on multiple genres:  
// url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28%20%7C%2012',


async function searchByGenre(genre: string) {
    console.log('searching by genre...');

    const optionsOld = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.MOVIE_API_KEY
        }
    };

    try {
        // console.log('requesting...');
        const response = await axios.request(optionsOld);;
        const data = response.data;
        // console.log(data.results[0]);
        // console.log(`total_results: ${data.total_results}`);
        // return data.results;
        /**
        */
        return data.results.map((movie: any) => ({
            title: movie.title,
            genre: movie.genre,
            year: movie.year,
            rating: movie.rating,
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
