import { Request, Response } from "express";
import EventosRepository from "../repositories/eventos.repository";
import { getLoggedUser } from "../utils/auth.utils";

async function criarEvento(req: Request, res: Response) {
  try {
    const usuario = getLoggedUser(req);

    const { titulo, descricao, data } = req.body;

    if (!titulo || !data) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Campos obrigatórios ausentes: título e data.",
        evento: null,
      });
    }

    const evento = await EventosRepository.criarEvento({
      titulo,
      descricao,
      data,
      organizador_id: usuario.id,
    });

    if (!evento) {
      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao criar o evento.",
        evento: null,
      });
    }

    return res.status(201).json({
      sucesso: true,
      mensagem: "Evento criado com sucesso",
      evento: evento,
    });
  } catch (error: any) {
    console.error("Erro no criarEvento:", error);
    return res.status(500).json({
      sucesso: false,
      mensagem: error.message || "Erro interno no servidor.",
      evento: null,
    });
  }
}

async function listarEventosPorOrganizador(req: Request, res: Response) {
  try {
    console.log("Entrei na listar eventos por organizador");
    const usuario = getLoggedUser(req);

    const eventos = await EventosRepository.listarEventosPorOrganizador(
      usuario.id
    );

    const response = {
      sucesso: true,
      eventos,
    };

    return res.json(response);
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({
      sucesso: false,
      mensagem: e.message || "Erro ao listar eventos do organizador.",
    });
  }
}

export default {
  criarEvento,
  listarEventosPorOrganizador,
};
