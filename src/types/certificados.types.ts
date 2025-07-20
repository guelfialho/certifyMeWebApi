export type CertificadoComEvento = {
  evento: {
    id: string;
    titulo: string;
    data: string;
    organizador: string;
  };
  presencaConfirmada: boolean;
  emitido: boolean;
};
