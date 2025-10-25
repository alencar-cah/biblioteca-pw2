import { connection } from "../infra/connection";

export type Livro = {
    id_livro?: number; 
    titulo: string;
    autor: string;
    editora?: string | null;
    ano_publicacao?: number | null;
    status_leitura?: 'não_lido' | 'lendo' | 'lido'; 
    data_adicao?: Date;
    id_usuario: number; 
    id_categoria?: number | null; 
};

export async function inserirLivro(livro: Livro) {
    await connection.query(
        `
    INSERT INTO livro (
      titulo, autor, editora, ano_publicacao, status_leitura, id_usuario, id_categoria
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `,
        [
            livro.titulo,
            livro.autor,
            livro.editora || null,
            livro.ano_publicacao || null,
            livro.status_leitura || 'não_lido',
            livro.id_usuario,
            livro.id_categoria || null 
        ]
    );
}

// em processo