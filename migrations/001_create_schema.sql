-- Ativa extensão para UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW(),
    deletado_em TIMESTAMP
);

-- Tabela de eventos
CREATE TABLE IF NOT EXISTS eventos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT NOT NULL,
    descricao TEXT,
    data DATE NOT NULL,
    local TEXT NOT NULL,
    organizador_id UUID NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW(),
    deletado_em TIMESTAMP,
    CONSTRAINT fk_evento_organizador FOREIGN KEY (organizador_id) REFERENCES usuarios(id)
);

-- Tabela de presenças
CREATE TABLE IF NOT EXISTS presencas (
    id SERIAL PRIMARY KEY,
    evento_id UUID NOT NULL,
    nome_participante TEXT NOT NULL,
    email_participante TEXT NOT NULL,
    cpf_participante TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW(),
    deletado_em TIMESTAMP,
    CONSTRAINT fk_presenca_evento FOREIGN KEY (evento_id) REFERENCES eventos(id),
    CONSTRAINT unique_presenca_por_evento_cpf UNIQUE (evento_id, cpf_participante)
);
