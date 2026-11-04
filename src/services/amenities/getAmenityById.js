import NotFoundError from '../../../errors/NotFoundError.js';
import prisma from '../../config/prisma.js';

const getAmenityById = async (id) => {
    const amenity = await prisma.amenity.findUnique({
        where: { id },
    });

    if (!amenity) {
        throw new NotFoundError('Amenity', id);
    }

    return amenity;
};

export default getAmenityById;
