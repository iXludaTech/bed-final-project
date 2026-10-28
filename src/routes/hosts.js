import { Router } from 'express';
import getHosts from '../services/hosts/getHosts.js';
import createHost from '../services/hosts/createHost.js';
import getHostById from '../services/hosts/getHostById.js';
import deleteHostById from '../services/hosts/deleteHost.js';
import updateHostById from '../services/hosts/updateHost.js';
import auth from '../../middleware/auth.js';

const router = Router();

// GET all hosts
router.get('/', async (req, res, next) => {
    try {
        const { name } = req.query;

        const hosts = await getHosts(name);

        res.status(200).json(hosts);
    } catch (error) {
        next(error);
    }
});

// GET host by ID
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const host = await getHostById(id);

        res.status(200).json(host);
    } catch (error) {
        next(error);
    }
});

// CREATE a host
router.post('/', auth, async (req, res, next) => {
    try {
        const {
            username,
            password,
            name,
            email,
            phoneNumber,
            pictureUrl,
            aboutMe,
        } = req.body;

        if (!username || !password || !name || !email) {
            return res.status(400).json({
                message: "Username, password, name and email are required.",
            });
        }

        const newHost = await createHost(
            username,
            password,
            name,
            email,
            phoneNumber,
            pictureUrl,
            aboutMe
        );

        res.status(201).json(newHost);
    } catch (error) {
        next(error);
    }
});

// DELETE a host by ID
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const host = await deleteHostById(id);

        res.status(200).json({
            message: `Host with id ${id} successfully deleted`,
            host,
        });
    } catch (error) {
        next(error);
    }
});

// UPDATE a host by ID
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
            aboutMe,
        } = req.body;

        const updatedHost = await updateHostById(id, {
            username,
            password,
            name,
            email,
            phoneNumber,
            pictureUrl,
            aboutMe,
        });

        res.status(200).json({
            message: `Host with id ${id} successfully updated`,
            host: updatedHost,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
