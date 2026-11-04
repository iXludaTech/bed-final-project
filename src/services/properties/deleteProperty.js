import NotFoundError from '../../../errors/NotFoundError.js';
import prisma from '../../config/prisma.js';

const deletePropertyById = async (id) => {
    try {
        return await prisma.$transaction(async (tx) => {
            await tx.booking.deleteMany({
                where: { propertyId: id },
            });
            await tx.review.deleteMany({
                where: { propertyId: id },
            });
            try {
                await tx.property.update({
                    where: { id },
                    data: {
                        amenities: {
                            set: [],
                        },
                    },
                });
            } catch (e) {
                // ignore if no amenities relation issues
            }
            const property = await tx.property.delete({
                where: { id },
            });
            return property.id;
        });
    } catch (error) {
        if (error.code === 'P2025') {
        throw new NotFoundError('Property', id);
        }

        throw error;
    }
};

export default deletePropertyById;
