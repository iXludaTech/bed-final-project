import NotFoundError from '../../../errors/NotFoundError.js';
import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

const getHostById = async (id) => {

    const host = await prisma.host.findUnique({
        where: { id },
        include: {
            listings: true,
        },
    });
    
    if (!host) {
        throw new NotFoundError('Host', id);
    }
    return host;
};

export default getHostById;
