import { Request, Response } from "express";
import { inserirCategoria, buscarCategoriaPorNome, listarCategorias, atualizarCategoria, excluirCategoria } from "../models/categoria";

export async function listarCategoriasController(req: Request, res: Response) {
  const categorias = await listarCategorias();
  const mensagem = req.session.mensagem || null;

  // limpa a mensagem da sessão
  req.session.mensagem = null;

  res.render("categoria_list", { categorias, mensagem });
}

export async function cadastrarCategoria(req: Request, res: Response) {
  const { nome, descricao } = req.body;

  if (!nome) {
    req.session.mensagem = { type: "error", value: "Digite um nome válido." };
    return res.redirect("/categoria/listar");
  }

  const existe = await buscarCategoriaPorNome(nome);

  if (existe) {
    req.session.mensagem = { type: "error", value: "Já existe uma categoria com esse nome." };
    return res.redirect("/categoria/listar");
  }

  await inserirCategoria({ nome, descricao });

  req.session.mensagem = { type: "success", value: "Categoria cadastrada com sucesso!" };
  return res.redirect("/categoria/listar");
}

export async function editarCategoriaController(req: Request, res: Response) {
  const { id_categoria, nome, descricao } = req.body;

  if (!nome) {
    req.session.mensagem = { type: "error", value: "Digite um nome válido." };
    return res.redirect("/categoria/listar");
  }

  await atualizarCategoria(id_categoria, nome, descricao);

  req.session.mensagem = { type: "success", value: "Categoria atualizada com sucesso!" };
  return res.redirect("/categoria/listar");
}

export async function excluirCategoriaController(req: Request, res: Response) {
  const { id } = req.params;

  await excluirCategoria(Number(id));

  req.session.mensagem = { type: "success", value: "Categoria excluída com sucesso!" };
  
  res.redirect("/categoria/listar");
}
