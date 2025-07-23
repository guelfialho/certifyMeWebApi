import { db } from "../db";

async function registrarPresenca(
  eventoId: string,
  nome: string,
  email: string,
  cpf: string
) {
  const query = `
    INSERT INTO presencas (evento_id, nome_participante, email_participante, cpf_participante)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const { rows } = await db.query(query, [eventoId, nome, email, cpf]);
  return rows[0];
}

export default {
  registrarPresenca,
};
