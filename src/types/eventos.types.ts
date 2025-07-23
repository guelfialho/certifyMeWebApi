interface CriarEventoInput {
  titulo: string;
  descricao?: string;
  data: string;
  local: string;
  organizadorId: string;
}

interface EventoCriado {
  id: string;
  titulo: string;
  descricao: string | null;
  data: string;
  local: string;
}
