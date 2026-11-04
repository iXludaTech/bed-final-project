import prisma from '../../config/prisma.js';

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
