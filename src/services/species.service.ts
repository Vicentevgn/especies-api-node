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

export async function speciesByCategory(userId: string) {
    const species = await prisma.species.findMany({
        where: {
            userId,
        },
        select: {
            category: true,
            commonName: true,
            scientificName: true,
        },
    });

    const grouped = species.reduce((acc: any, item) => {
        const category = item.category;

        if (!acc[category]) {
            acc[category] = {
                category,
                count: 0,
                species: [],
            };
        }

        acc[category].count += 1;

        acc[category].species.push({
            commonName: item.commonName,
            scientificName: item.scientificName,
        });

        return acc;
    }, {});

    return Object.values(grouped);
}