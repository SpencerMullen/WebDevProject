import { Movie } from "../types/movie";
import axios from 'axios';

function searchByTitle(title: string): Movie[] {

    let movies: Movie[] = [];

    axios.get(`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`)
        .then((response) => {
            const data = response.data;
            const results = data.results;
            results.forEach((movie: any) => {
                let newMovie: Movie = {
                    title: movie.title,
                    genre: movie.genre,
                    year: movie.year,
                    rating: movie.rating,
                    director: movie.director,
                    description: movie.description,
                    image: movie.image,
                    id: movie.id
                }
                movies.push(newMovie);
            });
        })
        .catch((error) => {
            console.log(error);
        });

    return movies;
}

export default searchByTitle;