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

async function listarEventos(_: Request, res: Response) {
  const eventos = await EventosRepository.listarEventos();
  return res.json(eventos);
}

async function listarEventosPorOrganizador(req: Request, res: Response) {
  try {
    console.log("Entrei na listar eventos por organizador");
    const usuario = getLoggedUser(req);

    if (usuario.tipo !== "ORGANIZADOR") {
      return res.status(403).json({
        sucesso: false,
        mensagem: "Apenas organizadores podem listar seus eventos.",
      });
    }

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

async function inscreverNoEvento(req: Request, res: Response) {
  try {
    const usuario = getLoggedUser(req);

    if (usuario.tipo !== "ESTUDANTE") {
      return res.status(403).json({
        sucesso: false,
        mensagem: "Apenas estudantes podem se inscrever.",
      });
    }

    const { eventoId } = req.body;

    if (!eventoId) {
      return res
        .status(400)
        .json({ sucesso: false, mensagem: "ID do evento é obrigatório." });
    }

    await EventosRepository.inscreverEstudante(eventoId, usuario.id);

    return res.json({
      sucesso: true,
      mensagem: "Inscrição realizada com sucesso!",
    });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({
      sucesso: false,
      mensagem: e.message || "Erro ao se inscrever no evento.",
    });
  }
}

export default {
  criarEvento,
  listarEventos,
  inscreverNoEvento,
  listarEventosPorOrganizador,
};
