import NotFoundError from '../../../errors/NotFoundError.js';
import prisma from '../../config/prisma.js';

const updatePropertyById = async (id, updatedProperty) => {
    try {
        const property = await prisma.property.update({
        where: { id },
            data: updatedProperty,
        });

        return property;
    } catch (error) {
        if (error.code === 'P2025') {
            throw new NotFoundError('Property', id);
        }

        throw error;
    }
};

export default updatePropertyById;
