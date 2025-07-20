import { Router } from "express";
import UsuarioController from "../controllers/usuarios.controller";
import EventosController from "../controllers/eventos.controller";
import PresencasController from "../controllers/presencas.controller";
import CertificadosController from "../controllers/certificados.controller";
import autenticarToken from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", UsuarioController.loginUsuario);
router.post("/usuarios/cadastro", UsuarioController.cadastrarUsuario);

router.get("/eventos", autenticarToken, EventosController.listarEventos);
router.get(
  "/eventos/organizador",
  autenticarToken,
  EventosController.listarEventosPorOrganizador
);
router.post("/eventos", autenticarToken, EventosController.criarEvento);
router.post(
  "/eventos/inscricao",
  autenticarToken,
  EventosController.inscreverNoEvento
);

router.post(
  "/presencas",
  autenticarToken,
  PresencasController.registrarPresenca
);
router.get(
  "/certificados",
  autenticarToken,
  CertificadosController.listarCertificadosDoEstudante
);

router.get("/protegida", autenticarToken, (req, res) => {
  res.json({ mensagem: "Você acessou uma rota protegida!" });
});

export default router;
