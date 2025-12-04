import { Router } from 'express';
import { 
    cadastrarCategoria,
    listarCategoriasController,
    editarCategoriaController,
    excluirCategoriaController
} from '../Controllers/categoriaController';

import { authMiddleware } from '../middlewares/authMiddleware';

const CategoriaRoutes = Router();

CategoriaRoutes.get('/categoria/listar', authMiddleware, listarCategoriasController);
CategoriaRoutes.post('/categoria/cadastrar', authMiddleware, cadastrarCategoria);
CategoriaRoutes.post('/categoria/editar', authMiddleware, editarCategoriaController);
CategoriaRoutes.get('/categoria/excluir/:id', authMiddleware, excluirCategoriaController);
export {
    CategoriaRoutes
};
