import { connection } from "../infra/connection";

export type Categoria = {
  id_categoria?: number;
  nome: string;
  descricao?: string;
};

export async function inserirCategoria(cat: Categoria) {
  await connection.query(
    `
    INSERT INTO categoria (nome, descricao)
    VALUES ($1, $2)
    `,
    [cat.nome, cat.descricao || null]
  );
}

export async function buscarCategoriaPorNome(nome: string) {
  const result = await connection.query(
    `SELECT * FROM categoria WHERE nome = $1`,
    [nome]
  );
  return result.rows[0];
}

export async function listarCategorias() {
  const result = await connection.query(`SELECT * FROM categoria ORDER BY nome ASC`);
  return result.rows;
}


export async function atualizarCategoria(id: number, nome: string, descricao: string) {
  return connection.query(
    `UPDATE categoria SET nome = $1, descricao = $2 WHERE id_categoria = $3`,
    [nome, descricao, id]
  );
}

export async function excluirCategoria(id: number) {
  return connection.query(
    `DELETE FROM categoria WHERE id_categoria = $1`,
    [id]
  );
}