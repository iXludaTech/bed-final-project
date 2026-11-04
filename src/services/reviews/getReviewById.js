import NotFoundError from '../../../errors/NotFoundError.js';
import prisma from '../../config/prisma.js';

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
