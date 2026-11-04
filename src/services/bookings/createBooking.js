import prisma from '../../config/prisma.js';

const createBooking = async (
    userId,
    propertyId,
    checkinDate,
    checkoutDate,
    numberOfGuests,
    totalPrice,
    bookingStatus
) => {
    try {
        const booking = await prisma.booking.create({
            data: {
                userId,
                propertyId,
                checkinDate: new Date(checkinDate),
                checkoutDate: new Date(checkoutDate),
                numberOfGuests: Number(numberOfGuests),
                totalPrice: Number(totalPrice),
                bookingStatus: bookingStatus || "PENDING",
            },
        });

        return booking;
    } catch (error) {
        throw error;
    }
};

export default createBooking;
