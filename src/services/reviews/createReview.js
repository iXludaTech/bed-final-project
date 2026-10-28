import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const createReview = async (
    userId,
    propertyId,
    rating,
    comment
) => {
    try {
        const newReview = {
            userId,
            propertyId,
            rating: Number(rating),
            comment,
        };

        const review = await prisma.review.create({
            data: newReview,
        });

        return review;
    } catch (error) {
        throw error;
    }
};

export default createReview;
