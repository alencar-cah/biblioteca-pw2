import express from 'express';
import { usuarioRoutes } from './Routes/usuarioRoutes';
import { AdmRoutes } from './Routes/adm_routes';
import session from 'express-session';

const app = express();

app.set('view engine', 'ejs');

app.set('views', './src/views');

app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.redirect('/login');
});

app.use(session({
    secret: 'aula-pw2', // chave usada para assinar o cookie
    resave: false, // evita salvar as sessões se nada mudou
    saveUninitialized: true, // salva as sessões não inicializadas
    cookie: {maxAge: 1 * 1000 * 60 * 60 } // uma hora de tempo de expiração 
}));

app.use(usuarioRoutes);
app.use(AdmRoutes);

app.listen(3333, () => {
    console.log('Servidor rodando no endereço http://localhost:3333');
});