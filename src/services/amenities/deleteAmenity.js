import NotFoundError from '../../../errors/NotFoundError.js';
import prisma from '../../config/prisma.js';

const deleteHostById = async (id) => {
    try {
        const amenity = await prisma.amenity.delete({
            where: { id }
        });

        return amenity.id;
    } catch (error) {
        if (error.code === 'P2025') {
            throw new NotFoundError('Amenity', id);
        }

        throw error;
    }
};

export default deleteHostById;
