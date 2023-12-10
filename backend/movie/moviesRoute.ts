import express, { Request, Response } from 'express';
import searchByTitle from './Search/searchByTitle';
import searchByGenre from './Search/searchByGenre';
import getGenreOptions from './Genre/getGenreOptions';
import searchMostPopularMovies from './Search/searchMostPopularMovies'; 
import searchById from './Search/searchById';
import { findUserById } from '../mongo/routes/findUsers';

let router = express.Router();

const MoviesRoutes = (app: any) => {
    app.get("/search/:title", (req: Request, res: Response) => {
        const title = req.params.title;
        try {
            searchByTitle(title).then((movies) => {
                console.log('searchByTitle() returned');
                console.log(movies[0]);

                let movieMap = movies.map((movie: any) => ({
                    title: movie.title,
                    image: movie.image,
                    id: movie.id
                }))

                console.log('mapped movies');
                console.log(movieMap[0]);
                res.send(movieMap);
                console.log(`movies Size: ${movies.length}`);
            });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
        console.log('movies route end')
    });
    app.get("/search/genre/:genre", (req: Request, res: Response) => {
        const genres = req.params.genre.split(',');
        try {
            searchByGenre(genres).then((movies) => {
                res.send(movies);
            });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
        console.log('movies route end')
    });
    app.get("/genres/movies", (req: Request, res: Response) => {
        try {
            console.log('getting genres...');
            getGenreOptions().then((genres) => {
                res.send(genres);
            });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    });
    app.get('/movies/popular', (req: Request, res: Response) => {
        try {
            searchMostPopularMovies().then((movies) => {
                res.send(movies);
            });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
        console.log('movies route end')
    });
    app.get("/searchById/:id", (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            searchById(id).then((movie) => {
                if (movie === undefined) {
                    res.status(404).send("Movie not found");
                    return;
                }
                res.send(movie);
            });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    });
    app.get("/movies/recommendations", async (req: Request, res: Response) => {
        try {
            //make sure to convert Id to string
            let id = "0";
            // get user genres
            // const movies = getUserData(id).then((moviesGenres) => {
            //    searchByGenre(movieGenres);
            // });
            const userGenres = await findUserById(id); // TODO: make sure we can get the user's genres like this: string[]
            const temporaryUserGenres = ["28", "12", "16"]; // TODO: remove this line
            // Now, search for movies based on these genres
            // Assuming searchByGenre can handle an array of genres
            const recommendedMovies = await searchByGenre(temporaryUserGenres);
            // console.log("Backend: ", recommendedMovies);
            res.status(200).send(recommendedMovies);
            console.log('User recommended movies');
        } catch (error: any) {
            res.status(500).send(error.message);
        }
        console.log('movies route end')
    });
}

export default MoviesRoutes;