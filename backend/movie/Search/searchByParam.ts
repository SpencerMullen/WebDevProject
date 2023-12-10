import { Movie } from '../../types';
import axios from 'axios';

export default async function searchByParam(genre: string, title: string, sort: string) {

    let url = ``;
    if (title === '') {
        url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=${sort}&with_genres=${genre}`;
    } else {
        url = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;
    }
    console.log(url);
    const optionsOld = {
        method: 'GET',
        url: url,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.MOVIE_API_KEY
        }
    };
    console.log(optionsOld.url);
    try {
        const response = await axios.request(optionsOld);;
        const data = response.data;
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
