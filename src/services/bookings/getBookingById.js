import NotFoundError from '../../../errors/NotFoundError.js';
import prisma from '../../config/prisma.js';

const getBookingById = async (id) => {
    const booking = await prisma.booking.findUnique({
        where: { id },
    });

    if (!booking) {
        throw new NotFoundError('Booking', id);
    }

    return booking;
};

export default getBookingById;
