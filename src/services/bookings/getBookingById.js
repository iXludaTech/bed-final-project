import NotFoundError from '../../../errors/NotFoundError.js';
import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

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
