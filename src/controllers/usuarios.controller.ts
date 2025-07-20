import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import UsuariosRepository from "../repositories/usuarios.repository";

dotenv.config();

async function loginUsuario(req: Request, res: Response) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .status(400)
      .json({ sucesso: false, mensagem: "Email e senha são obrigatórios." });
  }

  const usuario = await UsuariosRepository.buscarPorEmailSenha(email, senha);
  if (usuario) {
    const token = jwt.sign(
      {
        id: usuario.id,
        tipo: usuario.tipo,
        nome: usuario.nome,
        email: usuario.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return res.json({
      sucesso: true,
      mensagem: "Login bem-sucedido!",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        tipo: usuario.tipo,
      },
    });
  } else {
    return res
      .status(401)
      .json({ sucesso: false, mensagem: "Email ou senha inválidos." });
  }
}

async function cadastrarUsuario(req: Request, res: Response) {
  const { nome, email, senha, tipo } = req.body;

  if (!nome || !email || !senha || !tipo) {
    return res
      .status(400)
      .json({ sucesso: false, mensagem: "Todos os campos são obrigatórios." });
  }

  const criado = await UsuariosRepository.criarUsuario({
    nome,
    email,
    senha,
    tipo,
  });

  const response = {
    sucesso: true,
    mensagem: "Usuário criado com sucesso.",
    usuario: criado,
  };

  return res.status(201).json(response);
}

export default {
  loginUsuario,
  cadastrarUsuario,
};
