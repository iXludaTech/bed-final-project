import prisma from '../../config/prisma.js';

const getAmenities = async () => {
    const amenities = await prisma.amenity.findMany();

    return amenities;
};

export default getAmenities;
