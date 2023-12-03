import axios from 'axios';

async function getGenreOptions() {
    console.log('getting genre options...');

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/genre/movie/list',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.MOVIE_API_KEY
        }
    };

    try {
        console.log('requesting...');
        const response = await axios.request(options);;
        const data = response.data;
        console.log(data.genres[0]);
        console.log(`total_results: ${data.total_results}`);
        // return data.results;
        /**
        */
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