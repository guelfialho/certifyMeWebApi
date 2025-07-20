import { db } from "../db";
import fs from "fs/promises";
import path from "path";

async function runSeed() {
  const filepath = path.join(__dirname, "../../migrations/002_seed.sql");
  const sql = await fs.readFile(filepath, "utf-8");

  try {
    await db.query(sql);
    console.log("Banco populado com sucesso");
  } catch (err) {
    console.error("Erro ao popular banco:", err);
  } finally {
    await db.end();
  }
}

runSeed();
