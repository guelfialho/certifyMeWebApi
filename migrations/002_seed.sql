-- Ativa extensão para UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Insere um organizador
INSERT INTO usuarios (nome, email, senha)
VALUES ('Lucas Almeida', 'lucas@organizadores.com', '1234');

-- Insere dois eventos organizados por Lucas
-- Evento com presença registrada
INSERT INTO eventos (titulo, descricao, data, local, organizador_id)
VALUES (
  'Encontro de Desenvolvedores',
  'Evento para networking e troca de experiências na área de tecnologia',
  '2025-08-15',
  'Centro de Inovação Tecnológica',
  (SELECT id FROM usuarios WHERE email = 'lucas@organizadores.com')
);

-- Evento sem presença ainda
INSERT INTO eventos (titulo, descricao, data, local, organizador_id)
VALUES (
  'Palestra sobre Inteligência Artificial',
  'Apresentação de tendências e aplicações práticas de IA',
  '2025-09-10',
  'Auditório Principal da UFBA',
  (SELECT id FROM usuarios WHERE email = 'lucas@organizadores.com')
);

-- Insere um participante no primeiro evento
INSERT INTO presencas (evento_id, nome_participante, email_participante, cpf_participante)
VALUES (
  (SELECT id FROM eventos WHERE titulo = 'Encontro de Desenvolvedores'),
  'Mariana Ribeiro',
  'mariana.ribeiro@gmail.com',
  '12345678901'
);
