import NotFoundError from '../../../errors/NotFoundError.js';
import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

const getPropertyById = async (id) => {

    const property = await prisma.property.findUnique({
        where: { id },
    });
    
    if (!property) {
        throw new NotFoundError('Property', id);
    }
    return property;
};

export default getPropertyById;
