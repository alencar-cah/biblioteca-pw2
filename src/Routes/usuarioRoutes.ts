import { Router } from 'express';
import { registrarUsuario, mostrarLogin } from '../Controllers/usuarioController';

const userRoutes = Router();

userRoutes.get('/login', mostrarLogin);
userRoutes.post('/login', registrarUsuario);

export {
    userRoutes
}
