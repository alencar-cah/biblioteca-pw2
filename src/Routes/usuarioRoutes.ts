import { Router } from 'express';
import { registrarUsuario, mostrarLogin, login } from '../Controllers/usuarioController';

const usuarioRoutes = Router();

usuarioRoutes.get('/login', mostrarLogin);
usuarioRoutes.post('/login', registrarUsuario);
usuarioRoutes.post('/user/login', login);

usuarioRoutes.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

export {
    usuarioRoutes
};
