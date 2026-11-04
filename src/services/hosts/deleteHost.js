import NotFoundError from '../../../errors/NotFoundError.js';
import prisma from '../../config/prisma.js';

const deleteHostById = async (id) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const properties = await tx.property.findMany({
                where: { hostId: id },
                select: { id: true },
            });
            const propertyIds = properties.map((p) => p.id);
            if (propertyIds.length > 0) {
                await tx.booking.deleteMany({
                    where: { propertyId: { in: propertyIds } },
                });
                await tx.review.deleteMany({
                    where: { propertyId: { in: propertyIds } },
                });
                // Remove property-amenity relations if any (implicit many-to-many)
                for (const pid of propertyIds) {
                    await tx.property.update({
                        where: { id: pid },
                        data: {
                            amenities: {
                                set: [],
                            },
                        },
                    });
                }
                await tx.property.deleteMany({
                    where: { id: { in: propertyIds } },
                });
            }
            const host = await tx.host.delete({
                where: { id },
            });
            return host.id;
        });

    } catch (error) {
        if (error.code === 'P2025') {
            throw new NotFoundError('Host', id);
        }

        throw error;
    }
};

export default deleteHostById;
