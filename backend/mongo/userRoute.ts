import db from '../mockDB/index';
import { Request, Response } from 'express';
import createNewUser from './routes/createNewUser';
import editUserData from './routes/editUserData';
import signIn from './routes/signIn';
import CustomSession from './customSession';
import { updateUser } from './routes/updateUser';
import { findUserById } from './routes/findUserById';
import { User } from '../types';

const UsersRoutes = (app: any) => {
    //REWORK
    app.get('/users', (req: Request, res: Response) => {
        res.json(db.users);
    });
    //REWORK
    app.get('/users/:id', (req: Request, res: Response) => {
        const { id } = req.params;
        const user = db.users.find((user) => user.id === Number(id));
        res.send(user);
    });
    //Update a user's data
    app.post('/users/update/:id', async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const status = await updateUser(userId, req.body);
            const currentUser = await findUserById(userId);
            if (currentUser !== null && currentUser !== undefined) {
                const session = req.session as CustomSession;
                session.currentUser = currentUser;
                res.status(200).send('User signed in successfully');
                console.log('User signed in successfully');
            } else {
                res.status(401).send('Invalid username or password');
            }
            console.log("User updated");
        } catch (error) {
            res.status(400).json({ message: "Unable to update user" });
        }
    });

    // create new user
    app.post('/users/signup', (req: Request, res: Response) => {
        try {
            const userData = req.body;
            createNewUser(userData);
            res.status(200).send('User created successfully');
            console.log('User created successfully')
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    });
    app.post('/users/signin', async (req: Request, res: Response) => {
        console.log("attempting to sign in");
        const username = req.body.username;
        const password = req.body.password;
        try {
            const currentUser = await signIn(username, password);
            if (currentUser !== null && currentUser !== undefined) {
                const session = req.session as CustomSession;
                session.currentUser = currentUser;
                res.status(200).send('User signed in successfully');
                console.log('User signed in successfully');
            } else {
                res.status(401).send('Invalid username or password');
            }
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    });
    app.post("/users/signout", (req: Request, res: Response) => {
        const session = req.session as CustomSession;
        session.destroy((err: any) => {
            if (err) {
                res.status(500).json(err);
                console.log("Error signing out user");
            } else {
                res.status(200).json({ message: "User signed out successfully" });
                console.log("User signed out successfully");
            }
        });
    });
    app.post("/users/account", (req: Request, res: Response) => {
        const session = req.session as CustomSession;
        res.json(session.currentUser);
    });
}

export default UsersRoutes;