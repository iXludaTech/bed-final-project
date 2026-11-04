import prisma from '../../config/prisma.js';

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
