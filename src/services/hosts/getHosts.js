import prisma from '../../config/prisma.js';

const getHosts = async (name) => {
    const hosts = await prisma.host.findMany({
        where: {
            ...(name !== undefined && { name }),
        },
        include: {
            listings: true,
        },
    });

    return hosts;
};

export default getHosts;
