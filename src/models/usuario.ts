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
        'SELECT * FROM usuario WHERE email=$1',
        [email]
    );
    return rows[0];
}

export async function atualizarUsuario(usuario: Usuario) {
    await connection.query(
        `
        UPDATE usuario SET name=$1, password=$2, email=$3
        WHERE id=$5;
        `,
        [
            usuario.nome,
            usuario.senha,
            usuario.email,
            usuario.id_usuario
        ]
    );
}

export async function deletarUsuario(id_usuario: string) {
    await connection.query(
        'DELETE FROM usuario WHERE id=$1', [id_usuario]
    );
}


