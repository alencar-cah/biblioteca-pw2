import { connection } from "../infra/connection";

export async function listarLivros(id_usuario: number) {
  const result = await connection.query(`
    SELECT l.*, c.nome AS categoria_nome
    FROM livro l
    LEFT JOIN categoria c ON c.id_categoria = l.id_categoria
    WHERE l.id_usuario = $1
    ORDER BY l.id_livro DESC
  `, [id_usuario]);

  return result.rows;
}

export async function inserirLivro(data: any) {
  return connection.query(
    `INSERT INTO livro (titulo, autor, editora, ano_publicacao, status_leitura, id_usuario, id_categoria)
     VALUES ($1,$2,$3,$4,$5,$6,$7)`,
    [
      data.titulo,
      data.autor,
      data.editora,
      data.ano_publicacao,
      data.status_leitura,
      data.id_usuario,
      data.id_categoria
    ]
  );
}

export async function atualizarLivro(data: any) {
  return connection.query(
    `UPDATE livro 
     SET titulo=$1, autor=$2, editora=$3, ano_publicacao=$4, status_leitura=$5, id_categoria=$6 
     WHERE id_livro=$7 AND id_usuario=$8`,
    [
      data.titulo,
      data.autor,
      data.editora,
      data.ano_publicacao,
      data.status_leitura,
      data.id_categoria,
      data.id_livro,
      data.id_usuario
    ]
  );
}

export async function excluirLivro(id: number, id_usuario: number) {
  return connection.query(
    `DELETE FROM livro WHERE id_livro=$1 AND id_usuario=$2`,
    [id, id_usuario]
  );
}

export async function contarLivros(id_usuario: number) {
  const result = await connection.query(
    `SELECT COUNT(*) AS total 
     FROM livro 
     WHERE id_usuario = $1`,
    [id_usuario]
  );
  return Number(result.rows[0].total);
}

export async function contarLivrosLidos(id_usuario: number) {
  const result = await connection.query(
    `SELECT COUNT(*) AS total 
     FROM livro 
     WHERE status_leitura = 'lido' AND id_usuario = $1`,
    [id_usuario]
  );
  return Number(result.rows[0].total);
}

export async function contarLivrosLendo(id_usuario: number) {
  const result = await connection.query(
    `SELECT COUNT(*) AS total 
     FROM livro 
     WHERE status_leitura = 'lendo' AND id_usuario = $1`,
    [id_usuario]
  );
  return Number(result.rows[0].total);
}

export async function contarLivrosNaoLidos(id_usuario: number) {
  const result = await connection.query(
    `SELECT COUNT(*) AS total 
     FROM livro 
     WHERE status_leitura = 'não_lido' AND id_usuario = $1`,
    [id_usuario]
  );
  return Number(result.rows[0].total);
}

export async function ultimosLivros(id_usuario: number) {
  const result = await connection.query(
    `SELECT l.*, c.nome AS categoria_nome
     FROM livro l
     LEFT JOIN categoria c ON c.id_categoria = l.id_categoria
     WHERE l.id_usuario = $1
     ORDER BY l.id_livro DESC
     LIMIT 5`,
    [id_usuario]
  );

  return result.rows;
}
