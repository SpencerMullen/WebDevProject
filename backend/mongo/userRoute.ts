import db from '../mockDB/index';
import { Request, Response } from 'express';
import createNewUser from './routes/createNewUser';
import editUserData from './routes/editUserData';
import { findUserById, findAllUsers, findUserByUsername } from './routes/findUsers';
import signIn from './routes/signIn';
import { updateUser } from './routes/updateUser';
import { transformToUserType } from '../util/transformUserType';
import model from './model';

const UsersRoutes = (app: any) => {
    app.get('/users', async (req: Request, res: Response) => {
        try {
            const users = await findAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ message: "Unable to find users" });
        }
    });
    app.get('/users/:id', (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = findUserById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: "Unable to find user" });
        }
    });
    // Get the current user's data
    app.post('/users/current', async (req: Request, res: Response) => {
        try {
            const session = req.session;
            if (session.currentUser) {
                console.log("Current user: ", session.currentUser);
                const user = await findUserById(session.currentUser.id);
                res.json(user);
            } else {
                res.json(null);
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Error in getting user info" });
        }
    });
    //Update a user's data ... might need adjustments based on what data needs to be updated
    app.put('/users/update/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const newUser = req.body;
            console.log("ID: ", id);
            console.log("BACKEND UPDATING USER: ", newUser, " ID: ", id);
            const status = await updateUser(id, newUser);
            console.log("MADE IT BACK TO ROUTE: ");
            const currentUser = await findUserById(id);
            console.log("CURRENT USER: ", currentUser);
        } catch (error) {
            res.status(400).json({ message: "Unable to update user" });
        }
    });
    app.post('/users/signup', async (req: Request, res: Response) => {
        try {
            const userData = req.body;
            const response = await createNewUser(userData);
            console.log("BACKEND SIGNING UP");
            res.status(200).send('User created successfully');
            // console.log('User created successfully')
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    });
    app.post('/users/signin', async (req: Request, res: Response) => {
        const username = req.body.username;
        const password = req.body.password;
        try {
            //isn't able to find the user
            const currentUser = await signIn(username, password);
            // console.log(currentUser);
            const session = req.session;
            session.currentUser = currentUser;
            console.log("BACKEND SIGNING IN");
            res.status(200).send('User signed in successfully');
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    });
    app.post("/users/signout", async (req: Request, res: Response) => {
        const session = req.session;
        console.log("SIGNING OUT: ", session);
        if (session.currentUser) {
            session.currentUser = null;
            console.log("BACKEND SIGNING OUT: ", session);
            res.status(200).send('User signed out successfully');
        } else {
            res.status(401).send('User not signed in');
        }
    });
    app.post("/users/account", (req: Request, res: Response) => {
        try {
            const session = req.session;
            if (session.currentUser) {
                res.json(session.currentUser);
            } else {
                res.json(null);
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Error in getting user info" });
        }
    });

}

export default UsersRoutes;