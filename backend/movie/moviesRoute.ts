import db from '../mockDB/index';
import express, { Request, Response } from 'express';
import { Movie } from '../types';

import searchByParam from './Search/searchByParam';
import searchByGenre from './Search/searchByGenre';
import getGenreOptions from './Genre/getGenreOptions';
import searchMostPopularMovies from './Search/searchMostPopularMovies'; 

let router = express.Router();

const MoviesRoutes = (app: any) => {
    app.get("/search/", (req: Request, res: Response) => {        
        try {
            const genre = typeof req.query.genre === 'string' ? req.query.genre : '';
            const title = typeof req.query.title === 'string' ? req.query.title : '';
            const sort = typeof req.query.sort === 'string' ? req.query.sort : '';
            searchByParam(genre, title, sort).then((movies) => {
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