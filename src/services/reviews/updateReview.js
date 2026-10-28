import NotFoundError from '../../../errors/NotFoundError.js';
import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const updateReviewById = async (id, updatedReview) => {
    try {
        const review = await prisma.review.update({
            where: { id },
            data: updatedReview,
        });

        return review;
    } catch (error) {
        if (error.code === 'P2025') {
            throw new NotFoundError('Review', id);
        }

        throw error;
    }
};

export default updateReviewById;
