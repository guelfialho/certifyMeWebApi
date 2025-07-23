import { Request, Response } from "express";
import PresencasRepository from "../repositories/presencas.repository";

async function registrarPresenca(req: Request, res: Response) {
  try {
    const { eventoId, nome, email, cpf } = req.body;

    if (!eventoId || !nome || !email || !cpf) {
      return res.status(400).json({
        sucesso: false,
        mensagem:
          "Dados incompletos: eventoId, nome, email e cpf são obrigatórios",
      });
    }

    const presenca = await PresencasRepository.registrarPresenca(
      eventoId,
      nome,
      email,
      cpf
    );

    return res.status(201).json({
      sucesso: true,
      mensagem: "Presença registrada com sucesso",
      presenca,
    });
  } catch (error) {
    console.error("Erro ao registrar presença:", error);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro interno ao registrar presença",
    });
  }
}

export default {
  registrarPresenca,
};
