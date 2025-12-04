import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  listarLivrosController,
  cadastrarLivroController,
  editarLivroController,
  excluirLivroController
} from "../Controllers/livroController";

const LivroRoutes = Router();

LivroRoutes.get("/livros/listar", authMiddleware, listarLivrosController);
LivroRoutes.post("/livros/cadastrar", authMiddleware, cadastrarLivroController);
LivroRoutes.post("/livros/editar", authMiddleware, editarLivroController);
LivroRoutes.get("/livros/excluir/:id", authMiddleware, excluirLivroController);

export { LivroRoutes };
