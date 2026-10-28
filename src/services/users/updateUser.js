import NotFoundError from '../../../errors/NotFoundError.js';
import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

const updateUserById = async (id, updatedUser) => {
    try {
        const data = { ...updatedUser };
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const user = await prisma.user.update({
            where: { id },
            data,
            omit: {
                password: true,
            },
        });

        return user;
    } catch (error) {
        if (error.code === 'P2025') {
            throw new NotFoundError('User', id);
        }

        throw error;
    }
};

export default updateUserById;
