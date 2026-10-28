import { Router } from 'express';
import getBookings from '../services/bookings/getBookings.js';
import createBooking from '../services/bookings/createbooking.js';
import getBookingById from '../services/bookings/getBookingById.js';
import deleteBookingById from '../services/bookings/deleteBooking.js';
import updateBookingById from '../services/bookings/updateBooking.js';
import auth from '../../middleware/auth.js';

const router = Router();

// GET all bookings, optionally filtered
router.get('/', async (req, res, next) => {
    try {
        const {
            userId,
            propertyId,
            checkinDate,
            checkoutDate,
            numberOfGuests,
            totalPrice,
            bookingStatus,
        } = req.query;

        const bookings = await getBookings(
            userId !== undefined ? userId : undefined,
            propertyId !== undefined ? propertyId : undefined,
            checkinDate,
            checkoutDate,
            numberOfGuests !== undefined
                ? Number(numberOfGuests)
                : undefined,
            totalPrice !== undefined ? Number(totalPrice) : undefined,
            bookingStatus
        );

        res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
});

// CREATE a booking
router.post('/', auth, async (req, res, next) => {
    try {
        const {
            propertyId,
            checkinDate,
            checkoutDate,
            numberOfGuests,
            totalPrice,
            bookingStatus,
        } = req.body;

        const userId = req.user.userId || req.user.id;

        if (!propertyId || !checkinDate || !checkoutDate || numberOfGuests === undefined || totalPrice === undefined) {
            return res.status(400).json({
                message: "propertyId, checkinDate, checkoutDate, numberOfGuests and totalPrice are required.",
            });
        }

        const newBooking = await createBooking(
            userId,
            propertyId,
            checkinDate,
            checkoutDate,
            numberOfGuests,
            totalPrice,
            bookingStatus
        );

        res.status(201).json(newBooking);
    } catch (error) {
        next(error);
    }
});

// GET booking by ID
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const booking = await getBookingById(id);

        res.status(200).json(booking);
    } catch (error) {
        next(error);
    }
});

// DELETE booking by ID
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const booking = await deleteBookingById(id);

        res.status(200).json({
            message: `Booking with id ${id} successfully deleted`,
            booking,
        });
    } catch (error) {
        next(error);
    }
});

// UPDATE booking by ID
router.put('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            userId,
            propertyId,
            checkinDate,
            checkoutDate,
            numberOfGuests,
            totalPrice,
            bookingStatus,
        } = req.body;

        const updatedBooking = await updateBookingById(id, {
            userId,
            propertyId,
            checkinDate,
            checkoutDate,
            numberOfGuests,
            totalPrice,
            bookingStatus,
        });

        res.status(200).json({
            message: `Booking with id ${id} successfully updated`,
            booking: updatedBooking,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
