import NotFoundError from '../../../errors/NotFoundError.js';
import prisma from '../../config/prisma.js';
import bcrypt from 'bcrypt';

const updateHostById = async (id, updatedHost) => {
    try {
        const data = { ...updatedHost };
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const host = await prisma.host.update({
            where: { id },
            data,
        });

        return host;
    } catch (error) {
        if (error.code === 'P2025') {
            throw new NotFoundError('Host', id);
        }

        throw error;
    }
};

export default updateHostById;
