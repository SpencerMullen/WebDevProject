//example link: 'https://api.themoviedb.org/3/search/movie?query=oppenheimer&include_adult=false&language=en-US&page=1'
import searchByTitle from "../movie/searchByTitle";

import express, { Request, Response } from "express"
let router = express.Router();

router.get("/search", (req: Request, res: Response) => {
    const title = req.params.title;
    try {
        const movies = searchByTitle(title);
        res.json(movies);
        console.log("Movies successfully sent")
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// module.exports = router;
export default router;