import prisma from '../../config/prisma.js';
import bcrypt from "bcrypt";

const createUser = async (
    username,
    password,
    name,
    email,
    phoneNumber,
    pictureUrl
) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                name,
                password: hashedPassword,
                email,
                phoneNumber,
                pictureUrl,
            },
            omit: {
                password: true,
            },
        });

        return user;
    } catch (error) {
        throw error;
    }

    return user;
};

export default createUser;
