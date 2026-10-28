import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const getUsers = async (username, email) => {
    const users = await prisma.user.findMany({
        where: {
            ...(username !== undefined && { username }),
            ...(email !== undefined && { email }),
        },
        omit: {
            password: true,
        },
    });

    return users;
};

export default getUsers;
