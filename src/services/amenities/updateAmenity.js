import NotFoundError from '../../../errors/NotFoundError.js';

const updateAmenityById = async (id, updatedAmenity) => {
    try {
        const amenity = await prisma.amenity.update({
            where: { id },
            data: updatedAmenity,
        });

        return amenity;
    } catch (error) {
        if (error.code === 'P2025') {
            throw new NotFoundError('Amenity', id);
        }

        throw error;
    }
};

export default updateAmenityById;
