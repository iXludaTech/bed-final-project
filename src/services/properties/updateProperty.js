import NotFoundError from '../../../errors/NotFoundError.js';
import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

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
