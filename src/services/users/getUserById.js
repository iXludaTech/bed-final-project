
import NotFoundError from '../../../errors/NotFoundError.js';
import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id },
        omit: {
            password: true,
        },
    });

    if (!user) {
        throw new NotFoundError('User', id);
    }
    return user;
};

export default getUserById;
