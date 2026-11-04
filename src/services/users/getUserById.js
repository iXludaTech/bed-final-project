import NotFoundError from '../../../errors/NotFoundError.js';
import prisma from '../../config/prisma.js';

const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id },
        omit: {
            password: true,
        },
    });

    if (!user) {
        throw new NotFoundError('User', id);
    }
    return user;
};

export default getUserById;
