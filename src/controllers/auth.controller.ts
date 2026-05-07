import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export async function register(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const user = await authService.register(email, password);

        return res.status(201).json(user);
    } catch (err: any) {
        return res.status(400).json({
            error: err.message
        });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const result = await authService.login(email, password);

        return res.json(result);
    } catch (err: any) {
        return res.status(400).json({
            error: err.message
        });
    }
}