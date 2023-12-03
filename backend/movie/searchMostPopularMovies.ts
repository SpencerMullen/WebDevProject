import axios from 'axios';
import { Movie } from '../types';

async function searchMostPopularMovies() {
    console.log('searching most popular movies...');

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.MOVIE_API_KEY
        }
    };

    try {
        console.log('requesting...');
        const response = await axios.request(options);;
        const data = response.data;
        console.log(data.results[0]);
        console.log(`total_results: ${data.total_results}`);
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

export default searchMostPopularMovies;