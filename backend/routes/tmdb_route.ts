import searchByTitle from "../movie/searchByTitle";

import express, { Request, Response } from "express"
let router = express.Router();

router.get("/search", (req: Request, res: Response) => {
    const title = req.query.title as string;
    try {
        const movies = searchByTitle(title);
        res.json(movies);
        console.log("Movies successfully sent: " + movies);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

export default router;