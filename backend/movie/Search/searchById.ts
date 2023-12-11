import { Movie } from "../../types";
import axios from "axios";

async function searchById(id: string): Promise<Movie | undefined> {
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.MOVIE_API_KEY}`
        }
    };

    try {
        const response = await axios.request(options);
        const data = response.data;
        return data as Movie;
    } catch (error) {
        console.error(error);
        return;
    }
}

export default searchById;