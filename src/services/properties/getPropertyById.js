import NotFoundError from '../../../errors/NotFoundError.js';
import prisma from '../../config/prisma.js';

const getPropertyById = async (id) => {

    const property = await prisma.property.findUnique({
        where: { id },
    });
    
    if (!property) {
        throw new NotFoundError('Property', id);
    }
    return property;
};

export default getPropertyById;
