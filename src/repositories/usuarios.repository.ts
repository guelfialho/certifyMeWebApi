import { db } from "../db";
import { Usuario } from "../types/usuario.types";

interface ICriarUsuario {
  nome: string;
  email: string;
  senha: string;
  tipo: "ESTUDANTE" | "ORGANIZADOR";
}

async function criarUsuario(params: ICriarUsuario) {
  const { nome, email, senha, tipo } = params;

  const query = `
    INSERT INTO usuarios (nome, email, senha, tipo)
    VALUES ($1, $2, $3, $4)
    RETURNING id, nome, email, tipo
  `;
  const values = [nome, email, senha, tipo];
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
      email,
      tipo
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
