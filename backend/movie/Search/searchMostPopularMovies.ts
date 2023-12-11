import axios from 'axios';
import { Movie } from '../../types';

async function searchMostPopularMovies() {
    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.MOVIE_API_KEY
        }
    };

    try {
        const response = await axios.request(options);;
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

export default searchMostPopularMovies;