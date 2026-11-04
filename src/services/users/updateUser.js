import prisma from '../../config/prisma.js';
import NotFoundError from '../../../errors/NotFoundError.js';
import bcrypt from 'bcrypt';

const updateUserById = async (id, updatedUser) => {
    try {
        const data = { ...updatedUser };
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const user = await prisma.user.update({
            where: { id },
            data,
            omit: {
                password: true,
            },
        });

        return user;
    } catch (error) {
        if (error.code === 'P2025') {
            throw new NotFoundError('User', id);
        }

        throw error;
    }
};

export default updateUserById;
