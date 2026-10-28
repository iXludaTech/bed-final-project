import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

const getBookings = async (
    userId,
    propertyId,
    checkinDate,
    checkoutDate,
    numberOfGuests,
    totalPrice,
    bookingStatus,
) => {
    return await prisma.booking.findMany({
        where: {
            ...(userId !== undefined && { userId }),
            ...(propertyId !== undefined && { propertyId }),
            ...(checkinDate !== undefined && {
                checkinDate: new Date(checkinDate),
            }),
            ...(checkoutDate !== undefined && {
                checkoutDate: new Date(checkoutDate),
            }),
            ...(numberOfGuests !== undefined && { numberOfGuests }),
            ...(totalPrice !== undefined && { totalPrice }),
            ...(bookingStatus !== undefined && { bookingStatus }),
        },
    });
};

export default getBookings;
