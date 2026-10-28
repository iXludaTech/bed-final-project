import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const getReviews = async (
    userId,
    propertyId,
    rating,
    comment
) => {
    const reviews = await prisma.review.findMany({
        where: {
            ...(userId !== undefined && { userId }),
            ...(propertyId !== undefined && { propertyId }),
            ...(rating !== undefined && { rating }),
            ...(comment !== undefined && {
                comment: {
                    contains: comment,
                    mode: 'insensitive',
                },
            }),
        },
    });

    return reviews;
};

export default getReviews;
