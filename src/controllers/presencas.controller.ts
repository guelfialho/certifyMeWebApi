import { Request, Response } from "express";
import PresencasRepository from "../repositories/presencas.repository";

async function registrarPresenca(req: Request, res: Response) {
  const { evento_id, estudante_id } = req.body;

  if (!evento_id || !estudante_id) {
    return res.status(400).json({ mensagem: "Campos obrigatórios ausentes." });
  }

  const presenca = await PresencasRepository.registrarPresenca(
    evento_id,
    estudante_id
  );
  return res.status(201).json({ mensagem: "Presença registrada.", presenca });
}

export default {
  registrarPresenca,
};
