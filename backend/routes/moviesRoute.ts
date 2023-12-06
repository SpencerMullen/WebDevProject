import db from '../mockDB/index';
import express, { Request, Response } from 'express';
import { Movie } from '../types';

import searchByTitle from '../movie/Search/searchByTitle';
import searchByGenre from '../movie/Search/searchByGenre';
import getGenreOptions from '../movie/Genre/getGenreOptions';
import searchMostPopularMovies from '../movie/Search/searchMostPopularMovies'; 

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
        const genre = req.params.genre;
        try {
            searchByGenre(genre).then((movies) => {
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
}

export default MoviesRoutes;