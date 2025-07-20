import { db } from "../db";
import { Usuario } from "../types/usuario.types";

interface ICriarUsuario {
  nome: string;
  email: string;
  senha: string;
}

async function criarUsuario(params: ICriarUsuario) {
  const { nome, email, senha } = params;

  const query = `
    INSERT INTO usuarios (nome, email, senha)
    VALUES ($1, $2, $3)
    RETURNING id, nome, email
  `;
  const values = [nome, email, senha];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function buscarPorEmailSenha(
  email: string,
  senha: string
): Promise<Usuario | undefined> {
  const query = `
    SELECT
      id,
      nome,
      email
    FROM usuarios
    WHERE email = $1 AND senha = $2 AND deletado_em IS NULL
  `;
  const { rows } = await db.query(query, [email, senha]);
  return rows[0] as Usuario | undefined;
}

export default {
  criarUsuario,
  buscarPorEmailSenha,
};
