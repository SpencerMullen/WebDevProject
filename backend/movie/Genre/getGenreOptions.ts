import axios from 'axios';

async function getGenreOptions() {
    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/genre/movie/list',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.MOVIE_API_KEY
        }
    };

    try {
        const response = await axios.request(options);;
        const data = response.data;
        return data.genres.map((genre: any) => ({
            id: genre.id,
            name: genre.name
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default getGenreOptions;