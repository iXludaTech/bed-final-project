import NotFoundError from '../../../errors/NotFoundError.js';
import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

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
