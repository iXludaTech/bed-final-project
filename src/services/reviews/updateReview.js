import NotFoundError from '../../../errors/NotFoundError.js';
import prisma from '../../config/prisma.js';

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
