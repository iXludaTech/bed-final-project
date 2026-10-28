import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const getProperties = async (location, pricePerNight) => {
    const properties = await prisma.property.findMany({
       where: {
            ...(location !== undefined && { location }),
            ...(pricePerNight !== undefined && { pricePerNight }),
        },            
    });

    return properties;
};

export default getProperties;
