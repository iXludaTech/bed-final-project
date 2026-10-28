import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const createAmenity = async (name) => {
    const newAmenity = {
        name,
    };

    const amenity = await prisma.amenity.create({
        data: newAmenity,
    });

    return amenity;
};

export default createAmenity;
