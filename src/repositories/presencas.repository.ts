import { db } from "../db";

async function registrarPresenca(evento_id: string, estudante_id: string) {
  const query = `
    INSERT INTO presencas (evento_id, estudante_id)
    VALUES ($1, $2)
    RETURNING *
  `;
  const { rows } = await db.query(query, [evento_id, estudante_id]);
  return rows[0];
}

export default {
  registrarPresenca,
};
