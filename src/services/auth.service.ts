import { prisma } from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(email: string, password: string) {
    const userExists = await prisma.user.findUnique({
        where: { email }
    });

    if (userExists) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    });

    return {
        id: user.id,
        email: user.email
    };
}

export async function login(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        {
            expiresIn: "1d"
        }
    );

    return { token };
}