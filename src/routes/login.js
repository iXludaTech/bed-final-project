import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });
const router = Router();

router.post("/", async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required.",
        });
        }

        const secretKey = process.env.AUTH_SECRET_KEY;

        if (!secretKey) {
            throw new Error("AUTH_SECRET_KEY is not configured.");
        }

        const existingUser = await prisma.user.findUnique({
            where: { username },
        });

        if (
            !existingUser ||
            !(await bcrypt.compare(password, existingUser.password))
        ) {
        return res.status(401).json({
            message: "Invalid credentials.",
        });
        }

        const token = jwt.sign(
            { userId: existingUser.id },
            secretKey,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Successfully logged in!",
            token,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
