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

async function listarEventosPorOrganizador(organizadorId: string) {
  const query = `
    SELECT
      e.id,
      e.titulo,
      e.descricao,
      e.data,
      e.local,
      COALESCE(
        json_agg(
          json_build_object(
            'nome', p.nome_participante,
            'email', p.email_participante,
            'cpf', p.cpf_participante
          )
        ) FILTER (WHERE p.id IS NOT NULL),
        '[]'
      ) AS participantes
    FROM eventos e
    LEFT JOIN presencas p ON p.evento_id = e.id AND p.deletado_em IS NULL
    WHERE e.deletado_em IS NULL AND e.organizador_id = $1
    GROUP BY e.id
    ORDER BY e.data
  `;

  const { rows } = await db.query(query, [organizadorId]);
  return rows;
}

export default {
  criarEvento,
  listarEventosPorOrganizador,
};
