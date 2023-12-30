import { Request, Response } from 'express';
import createNewUser from './DAO/createNewUser';
import { findUserById, findAllUsers } from './DAO/findUsers';
import signInUser from './DAO/signInUser';
import { updateUser } from './DAO/updateUser';
import model from './model';

const UsersRoutes = (app: any) => {
    const getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await findAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ message: "Unable to find users" });
        }
    }
    const getUserById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await findUserById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: "Unable to find user" });
        }
    }    
    const getCurrentUser = async (req: Request, res: Response) => {
        try {
            const session = req.session;
            if (session.currentUser) {
                const user = await findUserById(session.currentUser.id);
                res.json(user);
            } else {
                res.json(null);
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Error in getting user info" });
        }
    }
    const updateUserById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const newUser = req.body;
            const status = await updateUser(id, newUser);
            const currentUser = await findUserById(id);

            //log information if error occurs
        } catch (error) {
            res.status(400).json({ message: "Unable to update user" });
        }
    }
    const signUp = async (req: Request, res: Response) => {
        try {
            const userData = req.body;
            const response = await createNewUser(userData);
            res.status(200).send('User created successfully');
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
    const signIn = async (req: Request, res: Response) => {
        const username = req.body.username;
        const password = req.body.password;
        try {
            const currentUser = await signInUser(username, password);
            const session = req.session;
            session.currentUser = currentUser;
            res.status(200).send('User signed in successfully');
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
    const signOut = async (req: Request, res: Response) => {
        const session = req.session;
        console.log("SIGNING OUT: ", session);
        if (session.currentUser) {
            session.currentUser = null;
            console.log("BACKEND SIGNING OUT: ", session);
            res.status(200).send('User signed out successfully');
        } else {
            res.status(401).send('User not signed in');
        }
    }
    const getCurrentUserSession = (req: Request, res: Response) => {
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
    }
    const deleteUserById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            console.log("DELETING USER: ", id);
            const status = await model.findByIdAndDelete(id);
            res.status(200).json(status);
        } catch (error) {
            res.status(400).json({ message: "Unable to delete user" });
        }
    }

    app.get('/users', getAllUsers);
    app.get('/users/:id', getUserById);
    app.put('/users/update/:id', updateUserById);
    app.post('/users/signup', signUp);
    app.post('/users/signin', signIn);
    app.post("/users/signout", signOut);
    app.delete('/users/:id', deleteUserById);

    //look into removing one of these?
    app.post('/users/current', getCurrentUser);
    app.post("/users/account", getCurrentUserSession);
    
}

export default UsersRoutes;