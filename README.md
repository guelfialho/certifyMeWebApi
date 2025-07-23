
# CertifyMeWeb API

API backend para o sistema CertifyMeWeb, projeto final da disciplina Sistemas Web da UFBA.

---

## Sobre

Este projeto implementa a API para gerenciamento de eventos e controle de presenças. Organizador pode criar eventos, e participantes confirmam presença através de QR Codes. A API gerencia usuários, eventos e presenças, fornecendo dados para o frontend CertifyMeWeb.

---

## Requisitos

- Docker
- Node.js (versão compatível com ts-node-dev)
- PostgreSQL (rodando via Docker Compose)

---

## Scripts disponíveis

- `npm run db:start` — inicia o container Docker do banco de dados.
- `npm run db:migrate` — cria as tabelas no banco de dados.
- `npm run db:seed` — popula o banco de dados com dados de teste.
- `npm run dev` — inicia a API em modo desenvolvimento com hot reload.
- `npm run build` — compila o projeto TypeScript.
- `npm start` — inicia a API compilada.

---

## Como rodar

1. Inicie o banco de dados:

```bash
npm run db:start
```

2. Execute as migrations para criar as tabelas:

```bash
npm run db:migrate
```

3. Popule o banco com dados de teste:

```bash
npm run db:seed
```

4. Inicie a API em modo desenvolvimento:

```bash
npm run dev
```

A API irá rodar na porta `3000`.

---

## Dados de teste

Use o seguinte usuário organizador para login:

- Email: `lucas@organizadores.com`
- Senha: `1234`

---

## Estrutura do projeto

- `src/` — código fonte da API
- `src/routes/` — definição das rotas REST
- `src/controllers/` — lógica dos controladores
- `src/models/` — modelos de dados e acesso ao banco
- `src/scripts/` — scripts para migrações e seed
- `docker-compose.yml` — configuração do container do banco PostgreSQL

---

## Considerações finais

Este projeto faz parte da disciplina Sistemas Web da UFBA, orientado pela professora Laise Cavalcante Oliveira.

Qualquer dúvida ou sugestão, entre em contato.

