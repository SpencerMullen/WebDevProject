import { Movie } from '../types';
import axios from 'axios';

async function searchByTitle(title: string) {
    console.log('searching by title...');

    const optionsOld = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&sort_by=popularity.desc`,
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

export default searchByTitle;
