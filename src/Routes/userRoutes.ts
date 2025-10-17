import { Router } from 'express';
import { registrarUsuario, mostrarLogin } from '../Controllers/userController';

const userRoutes = Router();

userRoutes.get('/user/login', mostrarLogin);
userRoutes.post('/user/register', registrarUsuario);

export {
    userRoutes
}
