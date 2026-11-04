import NotFoundError from '../../../errors/NotFoundError.js';
import prisma from '../../config/prisma.js';

const getHostById = async (id) => {

    const host = await prisma.host.findUnique({
        where: { id },
        include: {
            listings: true,
        },
    });
    
    if (!host) {
        throw new NotFoundError('Host', id);
    }
    return host;
};

export default getHostById;
