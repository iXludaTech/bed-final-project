import prisma from '../../config/prisma.js';

const createAmenity = async (name) => {
    const newAmenity = {
        name,
    };

    const amenity = await prisma.amenity.create({
        data: newAmenity,
    });

    return amenity;
};

export default createAmenity;
