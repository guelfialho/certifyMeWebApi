import { db } from "../db";

export async function criarEvento({
  titulo,
  descricao,
  data,
  local,
  organizadorId,
}: CriarEventoInput): Promise<EventoCriado> {
  const insertQuery = `
    INSERT INTO eventos (titulo, descricao, data, local, organizador_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, titulo, descricao, data, local
  `;
  const insertValues = [titulo, descricao ?? null, data, local, organizadorId];
  const { rows } = await db.query(insertQuery, insertValues);

  return rows[0];
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
