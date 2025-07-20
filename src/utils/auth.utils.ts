import { Request } from "express";
import jwt from "jsonwebtoken";

interface UsuarioLogado {
  id: string;
  nome: string;
  tipo: string;
  email: string;
}

export function getLoggedUser(req: Request): UsuarioLogado {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    throw new Error("Token não fornecido.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UsuarioLogado;
    return decoded;
  } catch (error) {
    throw new Error("Token inválido.");
  }
}
