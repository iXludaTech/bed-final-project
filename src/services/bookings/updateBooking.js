import NotFoundError from '../../../errors/NotFoundError.js';
import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const updateBookingById = async (id, data) => {
    const existingBooking = await prisma.booking.findUnique({
        where: { id },
    });

    if (!existingBooking) {
        throw new NotFoundError('Booking', id);
    }

    const booking = await prisma.booking.update({
        where: { id },
        data: {
            ...(data.userId !== undefined && {
                userId: data.userId,
            }),
            ...(data.propertyId !== undefined && {
                propertyId: data.propertyId,
            }),
            ...(data.checkinDate !== undefined && {
                checkinDate: new Date(data.checkinDate),
            }),
            ...(data.checkoutDate !== undefined && {
                checkoutDate: new Date(data.checkoutDate),
            }),
            ...(data.numberOfGuests !== undefined && {
                numberOfGuests: data.numberOfGuests,
            }),
            ...(data.totalPrice !== undefined && {
                totalPrice: data.totalPrice,
            }),
            ...(data.bookingStatus !== undefined && {
                bookingStatus: data.bookingStatus,
            }),
        },
    });

    return booking;
};

export default updateBookingById;
