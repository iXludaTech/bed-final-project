import { Router } from 'express';
import getUsers from '../services/users/getUsers.js';
import createUser from '../services/users/createUser.js';
import getUserById from '../services/users/getUserById.js';
import deleteUserById from '../services/users/deleteUser.js';
import updateUserById from '../services/users/updateUser.js';
import auth from '../../middleware/auth.js';

const router = Router();

// GET all users
router.get('/', async (req, res, next) => {
    try {
        const { username, email } = req.query;
        const users = await getUsers(username, email);

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

// GET user by ID
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

// CREATE a user
router.post('/', auth, async (req, res, next) => {
    try {
        const {
            username,
            password,
            name,
            email,
            phoneNumber,
            pictureUrl,
        } = req.body;

        if (!username || !password || !name || !email) {
            return res.status(400).json({
                message: "Username, password, name and email are required.",
            });
        }

        const newUser = await createUser(
            username,
            password,
            name,
            email,
            phoneNumber,
            pictureUrl
        );

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

// DELETE a user by ID
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await deleteUserById(id);

        res.status(200).json({
            message: `User with id ${id} successfully deleted`,
            user,
        });
    } catch (error) {
        next(error);
    }
});

// UPDATE a user by ID
router.put('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            username,
            password,
            name,
            email,
            phoneNumber,
            pictureUrl,
        } = req.body;

        const updatedUser = await updateUserById(id, {
            username,
            password,
            name,
            email,
            phoneNumber,
            pictureUrl,
        });

        res.status(200).json({
            message: `User with id ${id} successfully updated`,
            user: updatedUser,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
