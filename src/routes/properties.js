import { Router } from 'express';
import getProperties from '../services/properties/getProperties.js';
import createProperty from '../services/properties/createProperty.js';
import getPropertyById from '../services/properties/getPropertyById.js';
import deletePropertyById from '../services/properties/deleteProperty.js';
import updatePropertyById from '../services/properties/updateProperty.js';
import auth from '../../middleware/auth.js';

const router = Router();

// GET all properties
router.get('/', async (req, res, next) => {
    try {
        const { location, pricePerNight } = req.query;
        // Validate pricePerNight
        if (
            pricePerNight !== undefined &&
            (
                !Number.isFinite(Number(pricePerNight)) ||
                Number(pricePerNight) < 0
            )
        ) {
            return res.status(400).json({
                message: "pricePerNight must be a valid non-negative number.",
            });
        }
        const properties = await getProperties(
            location,
            pricePerNight !== undefined
                ? Number(pricePerNight)
                : undefined
        );
        // Check whether properties exist
        if (properties.length === 0) {
            return res.status(404).json({
                message: "No properties found.",
            });
        }
        return res.status(200).json(properties);

    } catch (error) {
        next(error);
    }
});

// GET property by ID
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const property = await getPropertyById(id);

        res.status(200).json(property);
    } catch (error) {
        next(error);
    }
});

// CREATE a property
router.post('/', auth, async (req, res, next) => {
    try {
        const {
            title,
            description,
            location,
            pricePerNight,
            bedroomCount,
            bathRoomCount,
            maxGuestCount,
            hostId,
            rating,
        } = req.body;

        if (!title || !location || pricePerNight === undefined || !hostId) {
            return res.status(400).json({
                message: "title, location, pricePerNight and hostId are required.",
            });
        }

        const newProperty = await createProperty(
            title,
            description,
            location,
            pricePerNight,
            bedroomCount,
            bathRoomCount,
            maxGuestCount,
            hostId,
            rating
        );

        res.status(201).json(newProperty);
    } catch (error) {
        next(error);
    }
});

// DELETE a property by ID
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const property = await deletePropertyById(id);

        res.status(200).json({
            message: `Property with id ${id} successfully deleted`,
            property,
        });
    } catch (error) {
        next(error);
    }
});

// UPDATE a property by ID
router.put('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            location,
            pricePerNight,
            bedroomCount,
            bathRoomCount,
            maxGuestCount,
            hostId,
            rating,
        } = req.body;

        const updatedProperty = await updatePropertyById(id, {
            title,
            description,
            location,
            pricePerNight,
            bedroomCount,
            bathRoomCount,
            maxGuestCount,
            hostId,
            rating,
        });

        res.status(200).json({
            message: `Property with id ${id} successfully updated`,
            property: updatedProperty,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
