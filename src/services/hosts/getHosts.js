import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

const getHosts = async (name) => {
    const hosts = await prisma.host.findMany({
        where: {
            ...(name !== undefined && { name }),
        },
        include: {
            listings: true,
        },
    });

    return hosts;
};

export default getHosts;
