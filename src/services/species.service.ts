import { PrismaClient } from "@prisma/client";
import {getWeather} from "./weather.service";

const prisma = new PrismaClient();

export async function createSpecies(data: any, userId: string) {
    let weatherData = null;

    try {
        weatherData = await getWeather(
            data.latitude,
            data.longitude
        );
    } catch (err) {
        console.error("Weather API error:", err);
    }

    return prisma.species.create({
        data: {
            commonName: data.commonName,
            scientificName: data.scientificName,
            category: data.category,
            latitude: data.latitude,
            longitude: data.longitude,
            userId,
            externalData: weatherData,
        },
    });
}
export async function listSpecies(userId: string) {
    return prisma.species.findMany({
        where: {
            userId,
        },
    });
}