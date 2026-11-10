import prisma from '../../config/prisma.js';

const getHosts = async (name) => {
    const hosts = await prisma.host.findMany({
        where: {
            ...(name !== undefined && { name }),
        },
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

    return hosts;
};

export default getHosts;
