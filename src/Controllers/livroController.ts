import { Request, Response } from "express";
import { 
  listarLivros,
  inserirLivro,
  atualizarLivro,
  excluirLivro
} from "../models/livro";
import { listarCategorias } from "../models/categoria";

export async function listarLivrosController(req: Request, res: Response) {
  const { usuario } = req.session as any;

  const livros = await listarLivros(usuario.id);
  const categorias = await listarCategorias();

  res.render("livro_list", {
    livros,
    categorias,
    mensagem: null
  });
}

export async function cadastrarLivroController(req: Request, res: Response) {
  const { usuario } = req.session as any;

  const data = {
    titulo: req.body.titulo,
    autor: req.body.autor,
    editora: req.body.editora || null,
    ano_publicacao: req.body.ano_publicacao || null,
    status_leitura: req.body.status_leitura,
    id_usuario: usuario.id,
    id_categoria: req.body.id_categoria || null
  };

  await inserirLivro(data);

  const livros = await listarLivros(usuario.id);
  const categorias = await listarCategorias();

  res.render("livro_list", {
    livros,
    categorias,
    mensagem: { type: "success", value: "Livro cadastrado com sucesso!" }
  });
}

export async function editarLivroController(req: Request, res: Response) {
  const { usuario } = req.session as any;

  const data = {
    id_livro: req.body.id_livro,
    titulo: req.body.titulo,
    autor: req.body.autor,
    editora: req.body.editora || null,
    ano_publicacao: req.body.ano_publicacao || null,
    status_leitura: req.body.status_leitura,
    id_categoria: req.body.id_categoria || null,
    id_usuario: usuario.id
  };

  await atualizarLivro(data);

  const livros = await listarLivros(usuario.id);
  const categorias = await listarCategorias();

  res.render("livro_list", {
    livros,
    categorias,
    mensagem: { type: "success", value: "Livro atualizado com sucesso!" }
  });
}

export async function excluirLivroController(req: Request, res: Response) {
  const { usuario } = req.session as any;
  const { id } = req.params;

  await excluirLivro(Number(id), usuario.id);

  const livros = await listarLivros(usuario.id);
  const categorias = await listarCategorias();

  res.render("livro_list", {
    livros,
    categorias,
    mensagem: { type: "success", value: "Livro excluído com sucesso!" }
  });
}
