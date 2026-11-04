import NotFoundError from '../../../errors/NotFoundError.js';
import prisma from '../../config/prisma.js';

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
