import { Movie } from "../types/movie";
import axios from 'axios';

async function searchByTitle(title: string): Promise<Movie[]> {
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc`,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.MOVIE_API_KEY
        }
    };

    try {
        const response = await axios.request(options);
        const data = response.data;
        // console.log(data);
        return data.results.map((movie: any) => ({
            title: movie.title,
            genre: movie.genre,
            year: movie.year,
            rating: movie.rating,
            director: movie.director,
            description: movie.description,
            image: movie.image,
            id: movie.id
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default searchByTitle;
