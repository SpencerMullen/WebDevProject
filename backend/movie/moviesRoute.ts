import { Request, Response } from 'express';
import searchByParam from './Search/searchByParam';
import searchByGenre from './Search/searchByGenre';
import getGenreOptions from './Genre/getGenreOptions';
import searchMostPopularMovies from './Search/searchMostPopularMovies'; 
import searchById from './Search/searchById';
import { findUserById } from '../mongo/DAO/findUsers';

const MoviesRoutes = (app: any) => {
    const searchMovie = (req: Request, res: Response) => {        
        try {
            const genre = typeof req.query.genre === 'string' ? req.query.genre : '';
            const title = typeof req.query.title === 'string' ? req.query.title : '';
            const sort = typeof req.query.sort === 'string' ? req.query.sort : '';
            searchByParam(genre, title, sort).then((movies) => {
                res.send(movies);
            });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
    const searchMoviesByGenres = (req: Request, res: Response) => {
        const genres = req.params.genre.split(',');
        try {
            searchByGenre(genres).then((movies) => {
                res.send(movies);
            });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
    const getGenres = (req: Request, res: Response) => {
        try {
            getGenreOptions().then((genres) => {
                res.send(genres);
            });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
    const getMostPopularMovies = (req: Request, res: Response) => {
        try {
            searchMostPopularMovies().then((movies) => {
                res.send(movies);
            });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
    const getMovieById = (req: Request, res: Response) => {
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
    }
    const getMovieRecommendations = async (req: Request, res: Response) => {
        try {
            //make sure to convert Id to string
            let user = null
            const session = req.session;
            if (session.currentUser) {
                user = await findUserById(session.currentUser.id);
            } else {
                console.log("User not signed in");
            }
            
            if (user) {
                const userGenres = user.genreList;
                const recommendedMovies = await searchByGenre(userGenres);
                res.status(200).send(recommendedMovies);
            }
            
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }    

    app.get("/movies/search", searchMovie);
    app.get("/movies/genre-search/:genre", searchMoviesByGenres);
    app.get("/movies/genres", getGenres);
    app.get('/movies/popular', getMostPopularMovies);
    app.get("/movies/:id", getMovieById);
    app.post("/movies/recommendations", getMovieRecommendations);
}
export default MoviesRoutes;