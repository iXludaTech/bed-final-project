import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

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
