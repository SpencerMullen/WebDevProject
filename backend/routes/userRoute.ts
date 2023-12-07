import db from '../mockDB/index';
import { Request, Response } from 'express';
import createNewUser from '../mongo/createNewUser';

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
    app.post('/users/signup', (req: Request, res: Response) => {
        try {
            console.log('Creating new user...')
            console.log(req.body)
            const userData = req.body;
            createNewUser(userData);
            res.status(200).send('User created successfully');
            console.log('User created successfully')
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    });
}

export default UsersRoutes;