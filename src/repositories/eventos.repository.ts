import { db } from "../db";

async function criarEvento({ titulo, descricao, data, organizador_id }: any) {
  const query = `
    INSERT INTO eventos (titulo, descricao, data, organizador_id)
    VALUES ($1, $2, $3, $4)
    RETURNING id, titulo, descricao, data, organizador_id
  `;
  const values = [titulo, descricao, data, organizador_id];
  const { rows } = await db.query(query, values);

  const evento = rows[0];

  const organizadorQuery = `SELECT nome FROM usuarios WHERE id = $1`;

  const { rows: orgRows } = await db.query(organizadorQuery, [
    evento.organizador_id,
  ]);

  return {
    id: evento.id,
    titulo: evento.titulo,
    descricao: evento.descricao,
    data: evento.data,
    organizador: orgRows[0]?.nome || "Organizador desconhecido",
  };
}

async function listarEventos() {
  const query = `
    SELECT
      e.id,
      e.titulo,
      e.descricao,
      e.data,
      u.nome AS organizador
    FROM eventos e
    JOIN usuarios u ON e.organizador_id = u.id
    WHERE e.deletado_em IS NULL
    ORDER BY e.data
  `;

  const { rows } = await db.query(query);
  return rows;
}

async function listarEventosPorOrganizador(organizadorId: string) {
  const query = `
    SELECT
      e.id,
      e.titulo,
      e.descricao,
      e.data,
      u.nome AS organizador
    FROM eventos e
    JOIN usuarios u ON e.organizador_id = u.id
    WHERE e.deletado_em IS NULL AND e.organizador_id = $1
    ORDER BY e.data
  `;

  const { rows } = await db.query(query, [organizadorId]);
  return rows;
}

async function inscreverEstudante(eventoId: string, estudanteId: string) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // Insere na tabela de presenças
    await client.query(
      `INSERT INTO presencas (evento_id, estudante_id)
       VALUES ($1, $2)
       ON CONFLICT (evento_id, estudante_id) DO NOTHING`,
      [eventoId, estudanteId]
    );

    // Insere na tabela de certificados
    await client.query(
      `INSERT INTO certificados (evento_id, estudante_id)
       VALUES ($1, $2)
       ON CONFLICT (evento_id, estudante_id) DO NOTHING`,
      [eventoId, estudanteId]
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export default {
  criarEvento,
  listarEventos,
  inscreverEstudante,
  listarEventosPorOrganizador,
};
