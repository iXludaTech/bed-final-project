import prisma from '../../config/prisma.js';

const getUsers = async (username, email) => {
    const users = await prisma.user.findMany({
        where: {
            ...(username !== undefined && { username }),
            ...(email !== undefined && { email }),
        },
        omit: {
            password: true,
        },
    });

    return users;
};

export default getUsers;
