import { Request, Response } from "express";
import * as speciesService from "../services/species.service";

export async function create(req: Request, res: Response) {
    try {
        const userId = (req as any).userId;

        const species = await speciesService.createSpecies(
            req.body,
            userId
        );

        return res.status(201).json(species);
    } catch (err: any) {
        return res.status(400).json({
            error: err.message,
        });
    }
}

export async function list(req: Request, res: Response) {
    try {
        const userId = (req as any).userId;

        const species = await speciesService.listSpecies(userId);

        return res.json(species);
    } catch (err: any) {
        return res.status(400).json({
            error: err.message,
        });
    }
}

export async function speciesByCategory(
    req: Request,
    res: Response
) {
    try {
        const userId = (req as any).userId;

        const data = await speciesService.speciesByCategory(userId);

        return res.json(data);
    } catch (err: any) {
        return res.status(400).json({
            error: err.message,
        });
    }
}