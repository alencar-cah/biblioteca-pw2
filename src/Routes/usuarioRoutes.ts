import { Router } from 'express';
import { registrarUsuario, mostrarLogin, login } from '../Controllers/usuarioController';

const usuarioRoutes = Router();

usuarioRoutes.get('/login', mostrarLogin);
usuarioRoutes.post('/login', registrarUsuario);

usuarioRoutes.post('/user/login', login);

export {
    usuarioRoutes
}

