import db from '../mockDB/index';
import { Request, Response } from 'express';

const UsersRoutes = (app: any) => {
    // get all users from database
    app.get('/users', (req: Request, res: Response) => {
        res.json(db.users);
    });

    // get user by id
    app.get('/users/:id', (req: Request, res: Response) => {
        const { id } = req.params;
        const user = db.users.find((user) => user.id === Number(id));
        res.send(user);
    });

    // create new user
    app.post('/users', (req: Request, res: Response) => {
        const user = req.body;
        db.users.push(user);
        res.send(db.users);
    });
}

export default UsersRoutes;