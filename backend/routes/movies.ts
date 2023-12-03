import db from '../mockDB/index';
import searchByTitle from '../movie/searchByTitle';
import searchById from '../movie/searchById';
import express, { Request, Response } from 'express';
import { Movie } from '../types';

let router = express.Router();

const MoviesRoutes = (app: any) => {

    // search by title
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

    // search by id
    app.get("/searchById/:id", (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            searchById(id).then((movie) => {
                console.log('searchById() returned');
                console.log(movie);
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
}

export default MoviesRoutes;