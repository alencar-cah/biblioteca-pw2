import { Request, Response } from "express";
import { 
  contarLivros, 
  contarLivrosLidos, 
  contarLivrosLendo, 
  contarLivrosNaoLidos,
  ultimosLivros
} from "../models/livro";

export async function mostrarAdm(req: Request, res: Response) {
    const usuario = (req.session as any).usuario;

    if (!usuario) {
        return res.redirect("/login");
    }

    const totalLivros = await contarLivros(usuario.id);
    const livrosLidos = await contarLivrosLidos(usuario.id);
    const livrosLendo = await contarLivrosLendo(usuario.id);
    const livrosNaoLidos = await contarLivrosNaoLidos(usuario.id);
    const livrosRecentes = await ultimosLivros(usuario.id);

    res.render("dashboard", {
        usuario,
        totalLivros,
        livrosLidos,
        livrosLendo,
        livrosNaoLidos,
        livrosRecentes
    });
}
