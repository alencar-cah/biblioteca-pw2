import { connection } from "../infra/connection";

export type Categoria = {
    id_categoria?: number
    nome: string,
    descricao: string
}

export async function inserirCategoria(categoria: Categoria) {
    await connection.query(
        'INSERT INTO categoria(nome, descricao) VALUES ($1, $2);',
        [
            categoria.nome,
            categoria.descricao
        ]
    );
}
