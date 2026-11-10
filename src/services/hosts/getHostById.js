import NotFoundError from '../../../errors/NotFoundError.js';
import prisma from '../../config/prisma.js';

const getHostById = async (id) => {
    const host = await prisma.host.findUnique({
        where: { id },
        select: {
            id: true,
            username: true,
            name: true,
            email: true,
            phoneNumber: true,
            pictureUrl: true,
            aboutMe: true,
            listings: true,
        },
    });

    if (!host) {
        throw new NotFoundError('Host', id);
    }

    return host;
};

export default getHostById;
