import NotFoundError from '../../../errors/NotFoundError.js';
import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

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
