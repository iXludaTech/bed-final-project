import prisma from '../../config/prisma.js';

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
