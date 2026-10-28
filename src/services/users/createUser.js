import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from "bcrypt";
import 'dotenv/config';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

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
