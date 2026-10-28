import NotFoundError from '../../../errors/NotFoundError.js';
import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const getReviewById = async (id) => {
    const review = await prisma.review.findUnique({
        where: { id },
    });

    if (!review) {
        throw new NotFoundError('Review', id);
    }

    return review;
};

export default getReviewById;
