import { Request, Response } from "express";

export function mostrarAdm(req: Request, res: Response) {
    const { usuario } = req.session as any;
    res.render('dashboard',{ usuario });
}