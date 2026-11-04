import NotFoundError from '../../../errors/NotFoundError.js';
import prisma from '../../config/prisma.js';

const deleteBookingById = async (id) => {
    try {
        const booking = await prisma.booking.delete({
            where: { id },
        });

        return booking.id;
    } catch (error) {
        if (error.code === 'P2025') {
            throw new NotFoundError('Booking', id);
        }

        throw error;
    }
};

export default deleteBookingById;
