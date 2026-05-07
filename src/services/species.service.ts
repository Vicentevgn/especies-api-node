import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function createSpecies(data: any, userId: string) {
    try {
        return await prisma.species.create({
            data: {
                ...data,
                userId,
            },
        });
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                throw new Error("Species already exists for this user");
            }
        }
        throw err;
    }
}

export async function listSpecies(userId: string) {
    return prisma.species.findMany({
        where: {
            userId,
        },
    });
}