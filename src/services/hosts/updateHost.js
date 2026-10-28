import NotFoundError from '../../../errors/NotFoundError.js';
import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

const updateHostById = async (id, updatedHost) => {
    try {
        const data = { ...updatedHost };
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const host = await prisma.host.update({
            where: { id },
            data,
        });

        return host;
    } catch (error) {
        if (error.code === 'P2025') {
            throw new NotFoundError('Host', id);
        }

        throw error;
    }
};

export default updateHostById;
