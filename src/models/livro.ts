import { connection } from "../infra/connection";

export type Livro = {
    id_livro?: number,
    titulo: string,
    autor: string,
    editora: string,
    ano_publicacao: number,
    status_leitura: string,
    data_adicao: Date,
    id_categoria?: number
}

export async function inserirLivro(livro: Livro) {
    await connection.query(
        'INSERT INTO livro(titulo, autor, editora, ano_publicacao, status_leitura, data_adicao) VALUES ($1, $2, $3, $4, $5, $6);',
        [
            livro.titulo,
            livro.autor,
            livro.editora,
            livro.ano_publicacao,
            livro.status_leitura,
            livro.data_adicao
        ]
    );
}