import { Router } from 'express';
import { mostrarAdm } from '../Controllers/admController';
import { authMiddleware } from '../middlewares/authMiddleware';

const AdmRoutes = Router();

AdmRoutes.get('/adm', authMiddleware, mostrarAdm);

export {
    AdmRoutes
}
