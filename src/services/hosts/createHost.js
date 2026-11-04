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
    try {
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
        });

        return host;
    } catch (error) {
        throw error;
    }
};

export default createHost;
