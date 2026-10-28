
import NotFoundError from '../../../errors/NotFoundError.js';
import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

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
