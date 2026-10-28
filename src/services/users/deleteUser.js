
import NotFoundError from '../../../errors/NotFoundError.js';
import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const deleteUserById = async (id) => {
    try {
        return await prisma.$transaction(async (tx) => {
        // Delete the user's bookings first.
        await tx.booking.deleteMany({
            where: { userId: id },
        });
        await tx.review.deleteMany({
            where: { userId: id },
        });

        // Delete the user after the related records.
        const user = await tx.user.delete({
            where: { id },
        });

        return user.id;
        });
    } catch (error) {
        if (error.code === 'P2025') {
            throw new NotFoundError('User', id);
        }

        throw error;
    }
};

export default deleteUserById;
