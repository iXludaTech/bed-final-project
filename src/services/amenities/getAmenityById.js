import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import NotFoundError from '../../../errors/NotFoundError.js';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

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
