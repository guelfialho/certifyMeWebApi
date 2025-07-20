import { Router } from "express";
import UsuarioController from "../controllers/usuarios.controller";
import EventosController from "../controllers/eventos.controller";
import PresencasController from "../controllers/presencas.controller";
import autenticarToken from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", UsuarioController.loginUsuario);
router.post("/usuarios/cadastro", UsuarioController.cadastrarUsuario);

router.get(
  "/eventos/organizador",
  autenticarToken,
  EventosController.listarEventosPorOrganizador
);
router.post("/eventos", autenticarToken, EventosController.criarEvento);

router.post(
  "/presencas",
  autenticarToken,
  PresencasController.registrarPresenca
);

export default router;
