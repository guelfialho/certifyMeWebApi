import fs from "fs/promises";
import path from "path";
import { db } from "../db";

async function runMigration() {
  const filepath = path.join(
    __dirname,
    "../../migrations/001_create_schema.sql"
  );
  const sql = await fs.readFile(filepath, "utf-8");

  try {
    await db.query(sql);
    console.log("Tabelas criadas com sucesso");
  } catch (err) {
    console.error("Erro ao criar tabelas:", err);
  } finally {
    await db.end();
  }
}

runMigration();
