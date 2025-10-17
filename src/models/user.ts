import { connection } from "../infra/connection";

export type Usuario = {
    id_usuario?: number
    nome: string;
    email: string;
    senha: string;
    data_criacao?: string;
}

export async function inserir(usuario: Usuario) {
    await connection.query(
        'INSERT INTO usuario(nome, email, senha) VALUES ($1, $2, $3);',
        [
            usuario.nome,
            usuario.email,
            usuario.senha
        ]
    );
}

export async function buscarEmail(email: String) {
    const { rows } = await connection.query(
        'SELECT * FROM users WHERE email=$1',
        [email]
    );
    return rows[0];
}
