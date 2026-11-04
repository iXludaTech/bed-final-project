import prisma from '../../config/prisma.js';

const createProperty = async (
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    hostId,
    rating
) => {
    try {
        const newProperty = {
            title,
            description,
            location,
            pricePerNight: pricePerNight !== undefined ? Number(pricePerNight) : pricePerNight,
            bedroomCount: bedroomCount !== undefined ? Number(bedroomCount) : bedroomCount,
            bathRoomCount: bathRoomCount !== undefined ? Number(bathRoomCount) : bathRoomCount,
            maxGuestCount: maxGuestCount !== undefined ? Number(maxGuestCount) : maxGuestCount,
            hostId,
            rating: rating !== undefined && rating !== null ? Number(rating) : rating ?? null,
        };

        const properties = await prisma.property.create({
            data: newProperty,
        });

        return properties;
    } catch (error) {
        throw error;
    }
};

export default createProperty;
