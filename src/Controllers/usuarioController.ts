import { log } from "console";
import { Request, Response } from "express";
import { buscarEmail, inserir, Usuario, verificarLogin } from "../models/usuario";

export function mostrarLogin(req: Request, res: Response) {
    res.render('login', { response: null });
}

export async function registrarUsuario(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.render('login', {
            response: {
                type: 'error',
                value: 'Preencha os campos corretamente'
            }
        });
    }

    const buscarUsuario = await buscarEmail(email);

    if (buscarUsuario) {
        return res.render('login', {
            response: {
                type: 'error',
                value: 'E-mail já cadastrado.'
            }
        });
    }

    const usuario: Usuario = {
        nome,
        email,
        senha
    }

    await inserir(usuario); 

    return res.render('login', {
        response: {
            type: 'success',
            value: 'Usuário cadastrado com sucesso!'
        }
    });
}

export async function login(req: Request, res: Response) {
    const { email, senha } = req.body;

    const usuario = await verificarLogin(email, senha);

    if(!usuario) {
        return res.render('login', {
            response: {
                type: 'error',
                value: 'Email ou senha incorretos'
            }
        });
    }

    (req.session as any).usuario = {
        name: usuario.nome,
        email: usuario.email,
        id: usuario.id_usuario,
    }
    res.redirect('/adm');
}

// em processo