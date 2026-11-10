import prisma from '../../config/prisma.js';
import bcrypt from "bcrypt";

const createHost = async (
    username,
    password,
    name,
    email,
    phoneNumber,
    pictureUrl,
    aboutMe
) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newHost = {
        username,
        password: hashedPassword,
        name,
        email,
        phoneNumber,
        pictureUrl,
        aboutMe,
    };

    const host = await prisma.host.create({
        data: newHost,
        select: {
            id: true,
            username: true,
            name: true,
            email: true,
            phoneNumber: true,
            pictureUrl: true,
            aboutMe: true,
        },
    });

    return host;
};

export default createHost;
