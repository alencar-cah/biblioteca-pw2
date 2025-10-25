import { log } from "console";
import { Request, Response } from "express";
import { buscarEmail, inserir, Usuario } from "../models/usuario";

export function mostrarLogin(req: Request, res: Response) {
    res.render('login');
}

export async function registrarUsuario(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.render('login');
    }

    const buscarUsuario = await buscarEmail(email);

    if (buscarUsuario) {
        return res.render('login');
    }

    const usuario: Usuario = {
        nome,
        email,
        senha
    }

    await inserir(usuario); 

    return res.render('login');
}

// em processo
