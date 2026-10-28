import NotFoundError from '../../../errors/NotFoundError.js';
import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

const deleteReviewById = async (id) => {
    try {
        const review = await prisma.review.delete({
            where: { id }
        });

        return review.id;
    } catch (error) {
        if (error.code === 'P2025') {
            throw new NotFoundError('Review', id);
        }

        throw error;
    }
};

export default deleteReviewById;
